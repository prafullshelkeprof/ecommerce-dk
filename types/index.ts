export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // in øre (DKK cents)
  images: string[];
  thumbnail: string;
  category: string;
  tags: string[];
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  shippingAddress: Address;
  createdAt: string;
}

export interface Region {
  id: string;
  name: string;
  currency_code: string;
  tax_rate: number;
}
