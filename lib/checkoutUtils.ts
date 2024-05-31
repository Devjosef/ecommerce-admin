import Stripe from "stripe";

export const calculateTotalRevenue = (products: { price: number }[]): number => 
    products.reduce((acc: number, product: { price: number }) => acc + product.price * 100, 0);

export const createLineItems = (products: { name: string, price: number }[]) => 
    products.map((product: { name: string, price: number }) => ({
        quantity: 1,
        price_data: {
            currency: "USD",
            product_data: {
                name: product.name,
            },
            unit_amount: Math.round(product.price * 100)
        }
    }));
export const createStripeSession = async (lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], storeId: string) => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
        throw new Error("Stripe secret key is undefined.");
    }
    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' });
    return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_STORE_URL}/success?store_id=${storeId}`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/cancel?store_id=${storeId}`,
        metadata: { storeId }
    });
};