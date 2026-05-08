"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const total = subtotal();
  const shipping = total >= 49900 ? 0 : 4900;
  const tax = Math.round(total * 0.2); // 20% moms included in price
  const freeShippingThreshold = 49900;
  const remaining = freeShippingThreshold - total;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center py-20">
        <ShoppingBag size={64} className="text-gray-200" />
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Din kurv er tom</h1>
          <p className="text-gray-500 mt-2">Tilføj nogle produkter for at komme i gang</p>
        </div>
        <Link href="/products" className="btn-primary">
          Se alle produkter
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="container-dk py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/products" className="text-gray-500 hover:text-[#1a1a1a] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-[#1a1a1a]">Din kurv</h1>
          <span className="text-gray-500 text-lg">({items.reduce((s, i) => s + i.quantity, 0)} varer)</span>
        </div>

        {/* Free shipping progress */}
        {remaining > 0 && (
          <div className="bg-[#f0f7f4] rounded-lg p-4 mb-6">
            <p className="text-sm text-[#185548] font-medium">
              Du mangler kun <strong>{formatPrice(remaining)}</strong> for at opnå gratis fragt!
            </p>
            <div className="mt-2 h-2 bg-[#b3dbcd] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2d8a73] rounded-full transition-all duration-700"
                style={{ width: `${Math.min((total / freeShippingThreshold) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-xl p-5 flex gap-5 items-start shadow-sm border border-gray-100"
              >
                <Link href={`/products/${product.id}`} className="relative w-24 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-[#1a1a1a] hover:underline leading-snug">{product.title}</h3>
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#1a1a1a]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#1a1a1a]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-[#1a1a1a]">{formatPrice(product.price * quantity)}</p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors mt-2"
            >
              Tøm kurv
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-bold text-lg text-[#1a1a1a] mb-5">Ordreoversigt</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1a1a1a]">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Fragt</span>
                  <span className={`font-medium ${shipping === 0 ? "text-[#2d8a73]" : "text-[#1a1a1a]"}`}>
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Moms (inkl.)</span>
                  <span className="font-medium text-[#1a1a1a]">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base text-[#1a1a1a]">
                  <span>I alt</span>
                  <span>{formatPrice(total + shipping)}</span>
                </div>
              </div>

              {/* Coupon code */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Rabatkode"
                  className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2d8a73]"
                />
                <button className="btn-secondary text-sm px-4 py-2">
                  Anvend
                </button>
              </div>

              <Link href="/checkout" className="btn-primary w-full mt-5 py-3.5">
                Gå til kassen →
              </Link>

              {/* Payment methods */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-xs text-gray-400">Betal med:</span>
                <span className="border border-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded font-medium">VISA</span>
                <span className="border border-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded font-medium">MC</span>
                <span className="bg-[#5a24d5] text-white text-[10px] px-2 py-0.5 rounded font-medium">MobilePay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
