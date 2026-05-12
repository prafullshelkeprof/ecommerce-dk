import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Alle produkter",
  description: "Udforsk vores fulde sortiment af kvalitetsprodukter.",
};

const sortOptions = [
  { value: "newest", label: "Nyeste" },
  { value: "price-asc", label: "Pris: Laveste først" },
  { value: "price-desc", label: "Pris: Højeste først" },
  { value: "popular", label: "Populæreste" },
];

const categories = ["Alle", "Tøj", "Køkken", "Bolig", "Accessories", "Have & Planter"];

interface ProductsPageProps {
  searchParams: Promise<{ sort?: string; category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { sort = "newest", category = "Alle" } = await searchParams;

  let products = [...mockProducts];

  if (category && category !== "Alle") {
    products = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (sort === "price-asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === "popular") {
    products.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
  }

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-[#f2ede6] py-12">
        <div className="container-dk">
          <p className="text-xs uppercase tracking-[0.25em] text-[#2d8a73] font-semibold mb-2">
            Sortiment
          </p>
          <h1 className="text-4xl font-bold text-[#1a1a1a]">Alle produkter</h1>
          <p className="text-gray-600 mt-2 text-sm">{products.length} produkter</p>
        </div>
      </div>

      <div className="container-dk py-8">
        {/* Filters & sort bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Category filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/products?category=${cat}&sort=${sort}`}
                className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
                  category === cat
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    : "border-gray-200 text-gray-600 hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-500" />
            <select
              defaultValue={sort}
              className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-[#2d8a73] bg-white"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-semibold">Ingen produkter fundet</p>
            <p className="text-sm mt-1">Prøv at ændre dine filtre</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
