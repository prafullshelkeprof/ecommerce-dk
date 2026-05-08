"use client";

import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useCart } from "@/context/CartContext";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const itemCount = totalItems();
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: t("news"), href: "/products?sort=newest" },
    { label: t("products"), href: "/products" },
    { label: t("sale"), href: "/products?sort=sale" },
    { label: t("about"), href: "/about" },
  ];

  const switchLocale = () => {
    const next = locale === "da" ? "en" : "da";
    router.replace(pathname, { locale: next as "da" | "en" });
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#1a1a1a] text-white text-center py-2 text-xs tracking-wider font-medium">
        {t("announcement")}
      </div>

      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-dk">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-[#1a1a1a]">
              <span className="text-[#2d8a73]">●</span> Din Butik
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden md:flex text-gray-600 hover:text-[#1a1a1a] transition-colors" aria-label={t("search")}>
                <Search size={20} />
              </button>
              <button className="hidden md:flex text-gray-600 hover:text-[#1a1a1a] transition-colors" aria-label={t("wishlist")}>
                <Heart size={20} />
              </button>

              {/* Locale switcher */}
              <button
                onClick={switchLocale}
                className="hidden md:flex text-xs font-semibold text-gray-600 hover:text-[#1a1a1a] transition-colors border border-gray-200 rounded px-2 py-1"
                aria-label="Switch language"
              >
                {locale === "da" ? "EN" : "DA"}
              </button>

              {/* Cart button */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-1.5 text-gray-700 hover:text-[#1a1a1a] transition-colors"
                aria-label={t("cart")}
              >
                <ShoppingBag size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#2d8a73] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none min-w-[18px] min-h-[18px]">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <button
                className="md:hidden text-gray-700"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="container-dk py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-[#1a1a1a]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={switchLocale}
                className="text-sm font-medium text-gray-600 text-left"
              >
                {locale === "da" ? "Switch to English" : "Skift til Dansk"}
              </button>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
