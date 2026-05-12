import { useTranslations } from "next-intl";
import { ArrowRight, Truck, RotateCcw, Shield, Leaf } from "lucide-react";
import { Link } from "@/i18n/navigation";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/medusa";
import { mockProducts } from "@/lib/mockData";

export default async function HomePage() {
  const t = useTranslations("Home");

  const products = await getProducts({ limit: 8 }).catch(() => mockProducts.slice(0, 8));
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  const categories = [
    { label: t("clothing"), emoji: "👔", href: "/products?category=tøj" },
    { label: t("kitchen"), emoji: "🍽️", href: "/products?category=køkken" },
    { label: t("homeCategory"), emoji: "🏡", href: "/products?category=bolig" },
    { label: t("accessories"), emoji: "🎒", href: "/products?category=accessories" },
    { label: t("garden"), emoji: "🌿", href: "/products?category=have" },
  ];

  const perks = [
    { icon: Truck, title: t("freeShippingTitle"), desc: t("freeShippingDesc") },
    { icon: RotateCcw, title: t("returnsTitle"), desc: t("returnsDesc") },
    { icon: Shield, title: t("secureTitle"), desc: t("secureDesc") },
    { icon: Leaf, title: t("sustainableTitle"), desc: t("sustainableDesc") },
  ];

  return (
    <div>
      {/* Hero */}
      <HeroSection />

      {/* Category chips */}
      <section className="border-b border-gray-100 bg-white py-6">
        <div className="container-dk">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 shrink-0">
              {t("categoriesLabel")}
            </span>
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="shrink-0 flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
              >
                <span>{cat.emoji}</span> {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 bg-white">
        <div className="container-dk">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#2d8a73] font-semibold mb-1">
                {t("featuredBadge")}
              </p>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">{t("featuredTitle")}</h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
            >
              {t("viewAll")} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-20 bg-[#1a1a1a] text-white">
        <div className="container-dk text-center max-w-2xl mx-auto space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#4da68f] font-semibold">
            {t("bannerBadge")}
          </p>
          <h2 className="text-4xl font-bold leading-tight">
            {t("bannerTitleLine1")}
            <br />
            {t("bannerTitleLine2")}
          </h2>
          <p className="text-gray-400 leading-relaxed">{t("bannerDesc")}</p>
          <Link href="/about" className="btn-primary inline-flex">
            {t("bannerCta")}
          </Link>
        </div>
      </section>

      {/* New arrivals */}
      <section className="py-16 bg-[#faf8f5]">
        <div className="container-dk">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#2d8a73] font-semibold mb-1">
                {t("arrivalsBadge")}
              </p>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">{t("arrivalsTitle")}</h2>
            </div>
            <Link
              href="/products?sort=newest"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
            >
              {t("viewAllNew")} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-12 border-t border-gray-100 bg-white">
        <div className="container-dk">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="flex flex-col items-center text-center gap-3 p-4">
                <div className="w-12 h-12 rounded-full bg-[#f0f7f4] flex items-center justify-center">
                  <perk.icon size={22} className="text-[#2d8a73]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1a1a1a]">{perk.title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
