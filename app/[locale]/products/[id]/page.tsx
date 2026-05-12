import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/medusa";
import ProductDetailClient from "@/components/ProductDetailClient";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const product = await getProduct(id).catch(() => null);
  if (!product) return notFound();

  const allProducts = await getProducts({ limit: 20 }).catch(() => []);
  const relatedProducts = allProducts
    .filter((p) => p.id !== id && p.category === product.category)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
