/**
 * 🤖 AI Agent Loop for ecommerce-dk
 *
 * Flow:
 *   1. Take a requirement (from CLI arg or prompt)
 *   2. Create a feature branch
 *   3. Agent reads codebase and makes code changes
 *   4. Run build/lint check
 *   5. If checks pass → commit + open PR
 *   6. If checks fail → agent retries (up to MAX_RETRIES)
 *
 * Usage:
 *   npx tsx agent/agent-loop.ts "Add a dark mode toggle to the header"
 *   npx tsx agent/agent-loop.ts   (will prompt you for a requirement)
 */

import Anthropic from "@anthropic-ai/sdk";
import { execSync, spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// ─── Config ──────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..");
const MAX_RETRIES = 3;
const MODEL = "claude-opus-4-5";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function run(cmd: string, cwd = ROOT): string {
  try {
    return execSync(cmd, { cwd, encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch (e: any) {
    return e.stdout?.toString() || e.message;
  }
}

function runCheck(cmd: string, cwd = ROOT): { ok: boolean; output: string } {
  const result = spawnSync(cmd, { shell: true, cwd, encoding: "utf-8" });
  return {
    ok: result.status === 0,
    output: (result.stdout || "") + (result.stderr || ""),
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 50);
}

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans); }));
}

// ─── Read codebase snapshot ───────────────────────────────────────────────────

function getCodebaseSnapshot(): string {
  const include = [
    "app/**/*.tsx",
    "app/**/*.ts",
    "components/**/*.tsx",
    "lib/**/*.ts",
    "context/**/*.tsx",
    "types/**/*.ts",
  ];

  const lines: string[] = [];

  function readDir(dir: string, pattern: RegExp) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next") {
        readDir(fullPath, pattern);
      } else if (entry.isFile() && pattern.test(entry.name)) {
        const rel = path.relative(ROOT, fullPath);
        const content = fs.readFileSync(fullPath, "utf-8");
        lines.push(`\n### FILE: ${rel}\n\`\`\`tsx\n${content}\n\`\`\``);
      }
    }
  }

  const dirs = ["app", "components", "lib", "context", "types"];
  for (const d of dirs) readDir(path.join(ROOT, d), /\.(tsx?|js)$/);

  return lines.join("\n");
}

// ─── Agent tools ──────────────────────────────────────────────────────────────

const tools: Anthropic.Tool[] = [
  {
    name: "read_file",
    description: "Read the contents of a file relative to the project root.",
    input_schema: {
      type: "object" as const,
      properties: { file_path: { type: "string", description: "Relative path from project root" } },
      required: ["file_path"],
    },
  },
  {
    name: "write_file",
    description: "Write or overwrite a file with new content.",
    input_schema: {
      type: "object" as const,
      properties: {
        file_path: { type: "string", description: "Relative path from project root" },
        content: { type: "string", description: "Full file content to write" },
      },
      required: ["file_path", "content"],
    },
  },
  {
    name: "list_files",
    description: "List all non-ignored files in a directory.",
    input_schema: {
      type: "object" as const,
      properties: { dir_path: { type: "string", description: "Relative directory path" } },
      required: ["dir_path"],
    },
  },
  {
    name: "run_command",
    description: "Run a safe read-only shell command (e.g. grep, cat). No git or npm commands.",
    input_schema: {
      type: "object" as const,
      properties: { command: { type: "string", description: "Shell command to run" } },
      required: ["command"],
    },
  },
];

function executeTool(name: string, input: Record<string, string>): string {
  switch (name) {
    case "read_file": {
      const abs = path.join(ROOT, input.file_path);
      if (!fs.existsSync(abs)) return `File not found: ${input.file_path}`;
      return fs.readFileSync(abs, "utf-8");
    }
    case "write_file": {
      const abs = path.join(ROOT, input.file_path);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, input.content, "utf-8");
      return `✅ Written: ${input.file_path}`;
    }
    case "list_files": {
      const abs = path.join(ROOT, input.dir_path);
      if (!fs.existsSync(abs)) return `Directory not found: ${input.dir_path}`;
      const walk = (d: string): string[] => {
        const entries: string[] = [];
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
          if (e.name === "node_modules" || e.name === ".next") continue;
          const full = path.join(d, e.name);
          if (e.isDirectory()) entries.push(...walk(full));
          else entries.push(path.relative(ROOT, full));
        }
        return entries;
      };
      return walk(abs).join("\n");
    }
    case "run_command": {
      const blocked = ["git ", "npm ", "npx ", "yarn ", "rm ", "del "];
      if (blocked.some((b) => input.command.startsWith(b))) {
        return "❌ Blocked: destructive or install commands not allowed via this tool.";
      }
      return run(input.command);
    }
    default:
      return `Unknown tool: ${name}`;
  }
}

// ─── Core agent loop ──────────────────────────────────────────────────────────

async function runAgent(requirement: string, attempt: number): Promise<boolean> {
  console.log(`\n🤖 Agent attempt ${attempt}/${MAX_RETRIES}...`);

  const snapshot = getCodebaseSnapshot();

  const systemPrompt = `You are a senior TypeScript/React developer working on a Next.js 16 e-commerce storefront (ecommerce-dk).
The project uses: TypeScript, Tailwind CSS, Zustand, Medusa JS SDK, Stripe, next-intl (i18n: da/en), lucide-react.

Your job:
1. Understand the requirement
2. Read relevant files using the tools
3. Make the minimal, correct code changes using write_file
4. Ensure your changes are TypeScript-safe and match the existing code style
5. When done, respond with EXACTLY this JSON (no other text):
{"status":"done","files_changed":["path1","path2"],"summary":"what you did"}

Rules:
- NEVER change package.json or tsconfig.json
- Always use the existing color scheme: #1a1a1a (dark), #2d8a73 (green), #f2ede6 (cream)
- Match existing component patterns exactly
- Keep all Danish text in messages/da.json and English in messages/en.json`;

  const userMessage = `Requirement: ${requirement}

Current codebase snapshot:
${snapshot.slice(0, 60000)}`;

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userMessage },
  ];

  let iterations = 0;
  const MAX_ITER = 20;

  while (iterations < MAX_ITER) {
    iterations++;
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 8096,
      system: systemPrompt,
      tools,
      messages,
    });

    // Collect all tool uses in this response
    const toolUses = response.content.filter((b) => b.type === "tool_use");
    const textBlocks = response.content.filter((b) => b.type === "text");

    // Check for completion signal in text
    for (const block of textBlocks) {
      if (block.type === "text") {
        const match = block.text.match(/\{[\s\S]*"status"\s*:\s*"done"[\s\S]*\}/);
        if (match) {
          try {
            const result = JSON.parse(match[0]);
            console.log(`\n✅ Agent done. Changed: ${result.files_changed?.join(", ")}`);
            console.log(`   Summary: ${result.summary}`);
            return true;
          } catch {}
        }
      }
    }

    if (response.stop_reason === "end_turn" && toolUses.length === 0) {
      console.log("⚠️  Agent ended without tool use or done signal.");
      break;
    }

    // Execute tools if any
    if (toolUses.length > 0) {
      // Push the assistant message first
      messages.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of toolUses) {
        if (block.type === "tool_use") {
          process.stdout.write(`  🔧 ${block.name}(${JSON.stringify(block.input).slice(0, 80)})... `);
          const result = executeTool(block.name, block.input as Record<string, string>);
          console.log("done");
          toolResults.push({ type: "tool_result", tool_use_id: block.id, content: result });
        }
      }

      messages.push({ role: "user", content: toolResults });
    } else {
      messages.push({ role: "assistant", content: response.content });
      break;
    }
  }

  return false;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Get requirement
  let requirement = process.argv[2];
  if (!requirement) {
    requirement = await prompt("📋 Enter requirement: ");
  }
  if (!requirement.trim()) {
    console.error("❌ No requirement provided.");
    process.exit(1);
  }

  console.log(`\n🚀 Starting agent loop for: "${requirement}"`);

  // 2. Create feature branch
  const branchName = `feature/agent-${slugify(requirement)}-${Date.now()}`;
  run(`git checkout -b ${branchName}`);
  console.log(`🌿 Branch created: ${branchName}`);

  // 3. Run agent (with retries if build fails)
  let success = false;
  let lastBuildOutput = "";

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const agentOk = await runAgent(
      attempt === 1 ? requirement : `${requirement}\n\nPrevious attempt failed build/lint with:\n${lastBuildOutput}\nPlease fix these errors.`,
      attempt
    );

    if (!agentOk) {
      console.log("⚠️  Agent did not complete cleanly. Retrying...");
      continue;
    }

    // 4. Run build check
    console.log("\n🔨 Running build check...");
    const build = runCheck("npm run build", ROOT);
    if (build.ok) {
      console.log("✅ Build passed!");
      success = true;
      break;
    } else {
      lastBuildOutput = build.output.slice(0, 3000);
      console.log(`❌ Build failed (attempt ${attempt}):\n${lastBuildOutput.slice(0, 500)}...`);
    }
  }

  if (!success) {
    console.log("\n❌ Agent failed after max retries. Branch left for manual review.");
    console.log(`   Branch: ${branchName}`);
    process.exit(1);
  }

  // 5. Commit changes
  run(`git add -A`);
  run(`git commit -m "feat: ${requirement.slice(0, 72)}\n\n[agent-loop]"`);
  console.log("💾 Changes committed.");

  // 6. Push branch
  run(`git push -u origin ${branchName}`);
  console.log(`⬆️  Branch pushed: ${branchName}`);

  // 7. Open PR via gh CLI
  const prUrl = run(
    `gh pr create --title "feat: ${requirement.slice(0, 60)}" --body "## Summary\n\nAutomated by agent-loop.\n\n**Requirement:** ${requirement}\n\n## Changes\nSee commit for details." --base master --head ${branchName}`
  );
  console.log(`\n🎉 PR created: ${prUrl}`);
  console.log("\n✅ Agent loop complete! Review the PR and merge when ready.");
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
