"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

type Step = "kontakt" | "levering" | "betaling";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("kontakt");
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    phone: "",
    newsletter: false,
    saveInfo: false,
  });

  const total = subtotal();
  const shipping = total >= 49900 ? 0 : 4900;
  const orderTotal = total + shipping;

  const steps: { id: Step; label: string }[] = [
    { id: "kontakt", label: "Kontaktinfo" },
    { id: "levering", label: "Levering" },
    { id: "betaling", label: "Betaling" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Form */}
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-8 text-[#1a1a1a]">
            <span className="text-[#2d8a73]">●</span> Din Butik
          </Link>

          {/* Steps */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            {steps.map((s, i) => (
              <span key={s.id} className="flex items-center gap-2">
                <button
                  onClick={() => i < steps.findIndex((x) => x.id === step) && setStep(s.id)}
                  className={`font-medium transition-colors ${
                    step === s.id
                      ? "text-[#1a1a1a]"
                      : i < steps.findIndex((x) => x.id === step)
                      ? "text-[#2d8a73] underline cursor-pointer"
                      : "text-gray-400"
                  }`}
                >
                  {s.label}
                </button>
                {i < steps.length - 1 && <ChevronRight size={14} className="text-gray-400" />}
              </span>
            ))}
          </nav>

          {/* Kontakt step */}
          {step === "kontakt" && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#1a1a1a]">Kontaktinformation</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mailadresse</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="din@email.dk"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} className="rounded" />
                Tilmeld mig nyhedsbrevet og få 10% på næste køb
              </label>
              <button onClick={() => setStep("levering")} className="btn-primary w-full py-3.5">
                Fortsæt til levering →
              </button>
              <Link href="/cart" className="block text-center text-sm text-gray-500 hover:text-[#1a1a1a]">
                ← Tilbage til kurv
              </Link>
            </div>
          )}

          {/* Levering step */}
          {step === "levering" && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#1a1a1a]">Leveringsadresse</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Fornavn</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Efternavn</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse</label>
                <input
                  type="text"
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  placeholder="Gade og husnummer"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
                />
              </div>
              <input
                type="text"
                name="address2"
                value={form.address2}
                onChange={handleChange}
                placeholder="Lejlighedsnummer, etage (valgfrit)"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Postnummer</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="2100"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">By</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="København"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+45 12 34 56 78"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
                />
              </div>
              <button onClick={() => setStep("betaling")} className="btn-primary w-full py-3.5">
                Fortsæt til betaling →
              </button>
              <button onClick={() => setStep("kontakt")} className="block w-full text-center text-sm text-gray-500 hover:text-[#1a1a1a]">
                ← Tilbage
              </button>
            </div>
          )}

          {/* Betaling step */}
          {step === "betaling" && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#1a1a1a]">Betaling</h2>
              <div className="border border-gray-200 rounded-xl p-5 space-y-4 bg-white">
                <p className="text-sm font-semibold text-[#1a1a1a] flex items-center gap-2">
                  <Lock size={14} className="text-[#2d8a73]" />
                  Sikker betaling via Stripe
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Kortnummer</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Udløbsdato</label>
                    <input
                      type="text"
                      placeholder="MM / ÅÅ"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2d8a73]"
                    />
                  </div>
                </div>
              </div>
              <div className="border border-[#5a24d5]/30 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-[#5a24d5] transition-colors">
                <span className="bg-[#5a24d5] text-white text-xs font-bold px-2 py-1 rounded">MobilePay</span>
                <span className="text-sm font-medium text-gray-700">Betal med MobilePay</span>
              </div>
              <button className="btn-primary w-full py-4 text-base">
                <Lock size={16} />
                Gennemfør betaling – {formatPrice(orderTotal)}
              </button>
              <p className="text-center text-xs text-gray-400">
                Ved at gennemføre købet accepterer du vores{" "}
                <Link href="/terms" className="underline">handelsbetingelser</Link>
              </p>
            </div>
          )}
        </div>

        {/* Right: Order summary */}
        <div className="lg:pt-16">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-8 space-y-5">
            <h3 className="font-bold text-[#1a1a1a]">Din ordre</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 items-center">
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={product.thumbnail} alt={product.title} fill className="object-cover" sizes="56px" />
                    <span className="absolute -top-1.5 -right-1.5 bg-[#1a1a1a] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1a1a1a] line-clamp-2 leading-snug">{product.title}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">{formatPrice(product.price * quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Fragt</span>
                <span className={`font-medium ${shipping === 0 ? "text-[#2d8a73]" : ""}`}>
                  {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-2">
                <span>I alt</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
