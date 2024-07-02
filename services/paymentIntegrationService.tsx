import { stripe } from '@/lib/stripe';

export const setupPaymentIntegration = async () => {
  // Stripe is already initialized in the stripe.ts file
  console.log('Stripe initialized');
};

export const manageStripePayments = async (paymentData: { amount: number, currency: string, paymentMethodId: string }) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentData.amount,
      currency: paymentData.currency,
      payment_method: paymentData.paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });
    console.log('Payment successful:', paymentIntent);
    return paymentIntent;
  } catch (error) {
    console.error('Payment failed:', error);
    throw error;
  }
};