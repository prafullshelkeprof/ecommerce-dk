"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, Minus, Plus, Heart, Truck, RotateCcw, Shield, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { mockProducts } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  // Unwrap params — in production this should be done with `use()` or server component
  const id = (params as unknown as { id: string }).id;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) return notFound();

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = async () => {
    setAdding(true);
    addItem(product, quantity);
    await new Promise((r) => setTimeout(r, 700));
    setAdding(false);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-dk py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#1a1a1a]">Hjem</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-[#1a1a1a]">Produkter</Link>
          <ChevronRight size={12} />
          <span className="text-[#1a1a1a] font-medium line-clamp-1">{product.title}</span>
        </nav>
      </div>

      {/* Product detail */}
      <div className="container-dk pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? "border-[#1a1a1a]" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt={`${product.title} ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#2d8a73] font-semibold">{product.category}</p>
              <h1 className="text-3xl font-bold text-[#1a1a1a] mt-1 leading-tight">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviewCount} anmeldelser)</span>
              </div>
            </div>

            <p className="text-4xl font-bold text-[#1a1a1a]">{formatPrice(product.price)}</p>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {product.tags.map((tag) => (
                <span key={tag} className="bg-[#f0f7f4] text-[#185548] text-xs px-3 py-1 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#1a1a1a]">Antal</p>
              <div className="flex items-center border border-gray-200 rounded w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#1a1a1a]"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#1a1a1a]"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || adding}
                className={`btn-primary flex-1 py-3.5 ${!product.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {!product.inStock ? "Udsolgt" : adding ? "Tilføjer…" : "Tilføj til kurv"}
              </button>
              <button className="btn-secondary px-4 py-3.5" aria-label="Tilføj til ønskeliste">
                <Heart size={18} />
              </button>
            </div>

            {/* Delivery info */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              {[
                { icon: Truck, text: "Gratis fragt ved køb over 499 kr. Levering 1–3 hverdage." },
                { icon: RotateCcw, text: "30 dages returret. Enkel og gratis returnering." },
                { icon: Shield, text: "Sikker betaling med SSL-kryptering." },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={16} className="text-[#2d8a73] mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="bg-[#faf8f5] py-16">
          <div className="container-dk">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Lignende produkter</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
