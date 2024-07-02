import React, { useState } from 'react';
import { manageStripePayments } from '@/services/paymentIntegrationService';

const PaymentForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('usd');
  const [paymentMethodId, setPaymentMethodId] = useState<string>('');

  const handlePayment = async () => {
    const paymentData = {
      amount,
      currency,
      paymentMethodId,
    };
    try {
      const paymentIntent = await manageStripePayments(paymentData);
      console.log('Payment Intent:', paymentIntent);
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold">Payment Form</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 mb-2"
      />
      <input
        type="text"
        placeholder="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="text"
        placeholder="Payment Method ID"
        value={paymentMethodId}
        onChange={(e) => setPaymentMethodId(e.target.value)}
        className="border p-2 mb-2"
      />
      <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2">
        Pay
      </button>
    </div>
  );
};

export default PaymentForm;