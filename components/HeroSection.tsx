import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative bg-[#f2ede6] overflow-hidden">
      <div className="container-dk">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px] py-16 lg:py-0">
          {/* Text */}
          <div className="space-y-6 max-w-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-[#2d8a73] font-semibold">
              {t("badge")}
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-[1.1]">
              {t("headline1")}<br />
              {t("headline2")}<br />
              <span className="text-[#2d8a73]">{t("headline3")}</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary text-base px-8 py-3.5">
                {t("ctaShop")}
              </Link>
              <Link href="/about" className="btn-secondary text-base px-8 py-3.5">
                {t("ctaAbout")}
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-2">
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{t("customersCount")}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t("customersLabel")}</p>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{t("ratingCount")}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t("ratingLabel")}</p>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{t("deliveryCount")}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t("deliveryLabel")}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[480px] lg:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              alt={t("badge")}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
