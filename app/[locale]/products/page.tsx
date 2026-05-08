import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Products",
};

interface ProductsPageProps {
  searchParams: Promise<{ sort?: string; category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { sort = "newest", category = "Alle" } = await searchParams;
  const t = useTranslations("Products");

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
    products.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  const sortOptions = [
    { value: "newest", label: t("newest") },
    { value: "price-asc", label: t("priceAsc") },
    { value: "price-desc", label: t("priceDesc") },
    { value: "popular", label: t("popular") },
  ];

  const categoryOptions = [
    { value: "Alle", label: t("all") },
    { value: "Tøj", label: t("clothing") },
    { value: "Køkken", label: t("kitchen") },
    { value: "Bolig", label: t("homeCategory") },
    { value: "Accessories", label: t("accessories") },
    { value: "Have & Planter", label: t("garden") },
  ];

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-[#f2ede6] py-12">
        <div className="container-dk">
          <p className="text-xs uppercase tracking-[0.25em] text-[#2d8a73] font-semibold mb-2">
            {t("badge")}
          </p>
          <h1 className="text-4xl font-bold text-[#1a1a1a]">{t("title")}</h1>
          <p className="text-gray-600 mt-2 text-sm">{t("count", { count: products.length })}</p>
        </div>
      </div>

      <div className="container-dk py-8">
        {/* Filters & sort bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Category filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {categoryOptions.map((cat) => (
              <Link
                key={cat.value}
                href={`/products?category=${encodeURIComponent(cat.value)}&sort=${sort}`}
                className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
                  category === cat.value
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    : "border-gray-200 text-gray-600 hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-500" />
            <select
              defaultValue={sort}
              className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-[#2d8a73]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
