import type { Product } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Nordisk Linnedbluse – Naturhvid",
    description:
      "En tidløs linnedbluse med løst snit og naturlig tekstur. Perfekt til hverdagen og særlige lejligheder. Lavet af 100% bæredygtigt linned.",
    price: 69900,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    category: "Tøj",
    tags: ["linned", "bæredygtig", "ny"],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "2",
    title: "Keramik Kaffekop – Stengrå",
    description:
      "Håndlavet keramik kaffekop med mat overflade og organisk form. Rummer 250 ml og passer perfekt i hånden.",
    price: 24900,
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
    category: "Køkken",
    tags: ["keramik", "håndlavet"],
    inStock: true,
    rating: 4.9,
    reviewCount: 87,
  },
  {
    id: "3",
    title: "Uldtæppe – Mørk Koks",
    description:
      "Blødt og varmt uldtæppe i en klassisk mørkegrå farve. Perfekt til sofa eller seng. 130×200 cm.",
    price: 129900,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    category: "Bolig",
    tags: ["uld", "vinter", "bolig"],
    inStock: true,
    rating: 4.7,
    reviewCount: 63,
  },
  {
    id: "4",
    title: "Planteopsats i Terrakotta",
    description:
      "Elegant planteopsats i naturlig terrakotta med dræningshul. Passer til potter op til ø25 cm.",
    price: 18900,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
    category: "Have & Planter",
    tags: ["terrakotta", "planter"],
    inStock: true,
    rating: 4.6,
    reviewCount: 42,
  },
  {
    id: "5",
    title: "Skandinavisk Duftlys – Fyrretræ",
    description:
      "Håndstøbt duftlys med duften af nordisk fyrretræ og frisk luft. Brændetid: 45 timer. 220g.",
    price: 23900,
    images: [
      "https://images.unsplash.com/photo-1602607144041-6e0e0d97b95d?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1602607144041-6e0e0d97b95d?w=600&q=80",
    category: "Bolig",
    tags: ["duftlys", "håndlavet", "gave"],
    inStock: true,
    rating: 4.9,
    reviewCount: 198,
  },
  {
    id: "6",
    title: "Læder Nøglepung – Cognac",
    description:
      "Minimalistisk nøglepung i vegetabilsk garvet læder. Plads til op til 6 nøgler. Bliver smukkere med brug.",
    price: 34900,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    category: "Accessories",
    tags: ["læder", "gave", "minimalist"],
    inStock: true,
    rating: 4.8,
    reviewCount: 55,
  },
  {
    id: "7",
    title: "Bambus Serveringsbræt – Stor",
    description:
      "Flot serveringsbræt i FSC-certificeret bambus. 45×25 cm. Perfekt til oste, pålæg og tapas.",
    price: 28900,
    images: [
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
    category: "Køkken",
    tags: ["bambus", "bæredygtig", "servering"],
    inStock: false,
    rating: 4.7,
    reviewCount: 34,
  },
  {
    id: "8",
    title: "Strik Cardigan – Havblå",
    description:
      "Blød og varm cardigan i 100% merinould. Overdimensioneret snit med lommer og knapper i horn.",
    price: 89900,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    category: "Tøj",
    tags: ["strik", "merino", "vinter"],
    inStock: true,
    rating: 4.9,
    reviewCount: 76,
  },
];
