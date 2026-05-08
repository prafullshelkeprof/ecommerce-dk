import { loadStripe, type Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return stripePromise;
};

// Server-side Stripe (only import in Server Components / API Routes)
export async function getStripeServer() {
  const stripe = await import("stripe");
  return new stripe.default(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil",
  });
}

export async function createPaymentIntent(amount: number, currency = "dkk") {
  const stripe = await getStripeServer();
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
    metadata: { store: "ecommerce-dk" },
  });
  return paymentIntent;
}
