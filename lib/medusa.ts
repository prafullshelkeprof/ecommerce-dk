import Medusa from "@medusajs/js-sdk";

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  debug: process.env.NODE_ENV === "development",
});

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(params?: {
  limit?: number;
  offset?: number;
  category_id?: string[];
}) {
  const { products, count } = await medusa.store.product.list({
    region_id: process.env.NEXT_PUBLIC_DEFAULT_REGION || "dk",
    limit: params?.limit ?? 12,
    offset: params?.offset ?? 0,
    ...params,
  });
  return { products, count };
}

export async function getProduct(id: string) {
  const { product } = await medusa.store.product.retrieve(id, {
    region_id: process.env.NEXT_PUBLIC_DEFAULT_REGION || "dk",
  });
  return product;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function createCart() {
  const { cart } = await medusa.store.cart.create({
    region_id: process.env.NEXT_PUBLIC_DEFAULT_REGION || "dk",
  });
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
