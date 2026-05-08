"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();
  const total = subtotal();
  const freeShippingThreshold = 49900;
  const remaining = freeShippingThreshold - total;
  const t = useTranslations("CartDrawer");

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-semibold text-lg">{t("title")} ({items.reduce((s, i) => s + i.quantity, 0)})</h2>
          <button onClick={closeCart} className="text-gray-500 hover:text-[#1a1a1a] transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Free shipping progress */}
        {remaining > 0 && (
          <div className="px-6 py-3 bg-[#f0f7f4]">
            <p className="text-xs text-[#185548] font-medium">
              {t("freeShippingProgress", { amount: formatPrice(remaining) })}
            </p>
            <div className="mt-2 h-1.5 bg-[#b3dbcd] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2d8a73] rounded-full transition-all duration-500"
                style={{ width: `${Math.min((total / freeShippingThreshold) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
        {remaining <= 0 && (
          <div className="px-6 py-3 bg-[#f0f7f4]">
            <p className="text-xs text-[#185548] font-medium">{t("freeShippingAchieved")}</p>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-gray-200" />
              <p className="text-gray-500 text-sm">{t("emptyMessage")}</p>
              <button onClick={closeCart} className="btn-secondary text-sm">
                {t("continueShopping")}
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4">
                <div className="relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <p className="text-sm font-semibold text-[#1a1a1a] line-clamp-2 leading-snug mt-0.5">{product.title}</p>
                  <p className="text-sm font-bold mt-1">{formatPrice(product.price * quantity)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#1a1a1a]">
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center text-sm font-medium">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#1a1a1a]">
                        <Plus size={13} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(product.id)} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                      {t("remove")}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("subtotal")}</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("shipping")}</span>
              <span className="font-semibold">{remaining <= 0 ? t("shippingFree") : formatPrice(4900)}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-3">
              <span>{t("totalWithTax")}</span>
              <span>{formatPrice(remaining <= 0 ? total : total + 4900)}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full mt-2">
              {t("checkoutCta")}
            </Link>
            <button onClick={closeCart} className="btn-secondary w-full text-sm">
              {t("keepShopping")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

