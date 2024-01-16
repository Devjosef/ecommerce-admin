import Stripe from "stripe";

const stripeApiKey = process.env.STRIPE_API_KEY;

if (!stripeApiKey) {
  throw new Error("Stripe API key is missing. Please check your environment variables.");
}

export const stripe = new Stripe(stripeApiKey, {
  apiVersion: "2023-10-16",
  typescript: true,
});
