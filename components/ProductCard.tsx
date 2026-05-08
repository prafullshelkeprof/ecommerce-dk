"use client";

import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishListed, setWishListed] = useState(false);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();
  const t = useTranslations("ProductCard");

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem(product);
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badges */}
        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-white text-[#1a1a1a] text-[11px] font-semibold px-2.5 py-1 rounded uppercase tracking-wider">
            {t("outOfStock")}
          </span>
        )}

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setWishListed(!wishListed);
            }}
            className="bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            aria-label={t("addToWishlist")}
          >
            <Heart
              size={16}
              className={wishListed ? "fill-red-500 text-red-500" : "text-gray-600"}
            />
          </button>
        </div>

        {/* Quick add */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="btn-primary w-full text-sm py-2.5"
            >
              <ShoppingBag size={15} />
              {adding ? t("adding") : t("addToCart")}
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
        <h3 className="text-sm font-semibold text-[#1a1a1a] line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        <p className="text-sm font-bold text-[#1a1a1a]">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
