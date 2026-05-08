import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");

  const sections = [
    {
      title: t("shopSection"),
      links: [
        { label: t("allProducts"), href: "/products" },
        { label: t("newArrivals"), href: "/products?sort=newest" },
        { label: t("sale"), href: "/products?sort=sale" },
        { label: t("giftCards"), href: "/gift-cards" },
      ],
    },
    {
      title: t("helpSection"),
      links: [
        { label: t("faq"), href: "/faq" },
        { label: t("shipping"), href: "/shipping" },
        { label: t("sizeGuide"), href: "/size-guide" },
        { label: t("contact"), href: "/contact" },
      ],
    },
    {
      title: t("aboutSection"),
      links: [
        { label: t("ourStory"), href: "/about" },
        { label: t("sustainability"), href: "/sustainability" },
        { label: t("press"), href: "/press" },
        { label: t("careers"), href: "/careers" },
      ],
    },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white mt-auto">
      <div className="container-dk py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-[#2d8a73]">●</span> Din Butik
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{t("tagline")}</p>
            <div className="mt-6 flex gap-3">
              <span className="bg-white/10 text-white text-xs px-2.5 py-1 rounded font-medium">VISA</span>
              <span className="bg-white/10 text-white text-xs px-2.5 py-1 rounded font-medium">Mastercard</span>
              <span className="bg-[#5a24d5] text-white text-xs px-2.5 py-1 rounded font-medium">MobilePay</span>
            </div>
          </div>

          {/* Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-gray-300">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-gray-500 text-xs">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">{t("privacy")}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t("terms")}</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">{t("cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
