import Medusa from "@medusajs/js-sdk";
import type { Product } from "@/types";

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  debug: process.env.NODE_ENV === "development",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(p: any): Product {
  const variant = p.variants?.[0];
  const price =
    variant?.calculated_price?.calculated_amount ??
    variant?.prices?.[0]?.amount ??
    0;
  const imageUrls: string[] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (p.images?.map((i: any) => i.url) ?? []).filter(Boolean);

  return {
    id: p.id,
    title: p.title ?? "",
    description: p.description ?? "",
    price,
    images: imageUrls.length > 0 ? imageUrls : p.thumbnail ? [p.thumbnail] : [],
    thumbnail: p.thumbnail ?? imageUrls[0] ?? "",
    category: p.categories?.[0]?.name ?? "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tags: p.tags?.map((t: any) => t.value) ?? [],
    inStock:
      p.variants?.some(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (v: any) => !v.manage_inventory || (v.inventory_quantity ?? 1) > 0
      ) ?? true,
    rating: 0,
    reviewCount: 0,
  };
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(params?: {
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  const { products } = await medusa.store.product.list({
    limit: params?.limit ?? 12,
    offset: params?.offset ?? 0,
  });
  return products.map(toProduct);
}

export async function getProduct(id: string): Promise<Product> {
  const { product } = await medusa.store.product.retrieve(id);
  return toProduct(product);
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function createCart() {
  const { cart } = await medusa.store.cart.create({});
  return cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number) {
  const { cart } = await medusa.store.cart.createLineItem(cartId, {
    variant_id: variantId,
    quantity,
  });
  return cart;
}

export async function updateCartItem(cartId: string, lineItemId: string, quantity: number) {
  const { cart } = await medusa.store.cart.updateLineItem(cartId, lineItemId, {
    quantity,
  });
  return cart;
}

export async function removeCartItem(cartId: string, lineItemId: string) {
  const { cart } = await medusa.store.cart.deleteLineItem(cartId, lineItemId);
  return cart;
}

export async function getCart(cartId: string) {
  const { cart } = await medusa.store.cart.retrieve(cartId);
  return cart;
}
