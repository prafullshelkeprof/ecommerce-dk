import Link from "next/link";
import { ArrowRight, Truck, RotateCcw, Shield, Leaf } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";

const categories = [
  { label: "Tøj", emoji: "👔", href: "/products?category=tøj" },
  { label: "Køkken", emoji: "🍽️", href: "/products?category=køkken" },
  { label: "Bolig", emoji: "🏡", href: "/products?category=bolig" },
  { label: "Accessories", emoji: "🎒", href: "/products?category=accessories" },
  { label: "Have & Planter", emoji: "🌿", href: "/products?category=have" },
];

const perks = [
  {
    icon: Truck,
    title: "Gratis fragt fra 499 kr.",
    desc: "Hurtig levering 1–3 hverdage i hele Danmark",
  },
  {
    icon: RotateCcw,
    title: "30 dages returret",
    desc: "Ubesværet retur – ingen spørgsmål stillet",
  },
  {
    icon: Shield,
    title: "Sikker betaling",
    desc: "Betal med Dankort, MobilePay eller Stripe",
  },
  {
    icon: Leaf,
    title: "Bæredygtig fragt",
    desc: "Vi kompenserer for CO₂ på alle forsendelser",
  },
];

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4);
  const newArrivals = mockProducts.slice(4, 8);

  return (
    <div>
      {/* Hero */}
      <HeroSection />

      {/* Category chips */}
      <section className="border-b border-gray-100 bg-white py-6">
        <div className="container-dk">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 shrink-0">
              Kategorier:
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
                Udvalgte produkter
              </p>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">Bestsellere</h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
            >
              Se alle <ArrowRight size={16} />
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
            Vores løfte
          </p>
          <h2 className="text-4xl font-bold leading-tight">
            Kvalitet du kan mærke,<br />design du vil elske.
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Hvert produkt er nøje udvalgt med fokus på bæredygtighed, holdbarhed og skandinavisk æstetik. Vi samarbejder kun med producenter, der deler vores værdier.
          </p>
          <Link href="/about" className="btn-primary inline-flex">
            Lær os at kende
          </Link>
        </div>
      </section>

      {/* New arrivals */}
      <section className="py-16 bg-[#faf8f5]">
        <div className="container-dk">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#2d8a73] font-semibold mb-1">
                Ny tilgang
              </p>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">Nyheder</h2>
            </div>
            <Link
              href="/products?sort=newest"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
            >
              Se alle nyheder <ArrowRight size={16} />
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

      {/* Newsletter */}
      <section className="py-16 bg-[#f2ede6]">
        <div className="container-dk max-w-xl mx-auto text-center space-y-5">
          <h2 className="text-2xl font-bold text-[#1a1a1a]">Bliv en del af fællesskabet</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Tilmeld dig vores nyhedsbrev og få 10% rabat på dit første køb samt tidlig adgang til nye kollektioner.
          </p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="din@email.dk"
              className="flex-1 border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#2d8a73]"
            />
            <button type="submit" className="btn-primary py-2.5 px-5 text-sm">
              Tilmeld
            </button>
          </form>
          <p className="text-xs text-gray-400">
            Vi sender max 2 emails om måneden. Afmeld til enhver tid.
          </p>
        </div>
      </section>
    </div>
  );
}
