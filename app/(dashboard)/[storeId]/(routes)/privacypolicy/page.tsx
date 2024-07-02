import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal data in compliance with GDPR and CCPA.
      </p>
      <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
      <p className="text-gray-700 mb-4">
        We collect personal data that you provide to us directly, such as when you create an account, make a purchase, or contact us for support.
      </p>
      <h2 className="text-xl font-semibold mb-2">Data Usage</h2>
      <p className="text-gray-700 mb-4">
        We use your personal data to provide and improve our services, process transactions, and communicate with you.
      </p>
      <h2 className="text-xl font-semibold mb-2">Data Protection</h2>
      <p className="text-gray-700 mb-4">
        We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, alteration, and destruction.
      </p>
      <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
      <p className="text-gray-700 mb-4">
        Under GDPR and CCPA, you have the right to access, correct, delete, and restrict the processing of your personal data. You also have the right to data portability and to object to the processing of your personal data.
      </p>
      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p className="text-gray-700 mb-4">
        If you have any questions or concerns about this privacy policy or our data practices, please contact us at privacy@example.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;