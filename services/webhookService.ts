import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const processPayment = async (paymentData: any) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: paymentData.amount,
            currency: 'usd',
            ...paymentData.options // Additional options from the paymentData
        });
        return paymentIntent;
    } catch (error) {
        console.error("Failed to process payment:", error);
        throw new Error('Payment processing failed');
    }
};

export const processRefund = async (refundData: any) => {
    try {
        const refund = await stripe.refunds.create({
            payment_intent: refundData.paymentIntentId,
            amount: refundData.amount, // Optional, for partial refunds
        });
        return refund;
    } catch (error) {
        console.error("Failed to process refund:", error);
        throw new Error('Refund processing failed');
    }
};

export const handleError = (message: string, status: number, error?: any) => {
    console.error(message, error);
    return new Response(JSON.stringify({ error: message }), { status });
};