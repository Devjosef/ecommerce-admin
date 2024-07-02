import React, { useState } from 'react';

const ConsentForm: React.FC = () => {
  const [consent, setConsent] = useState<boolean>(false);

  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConsent(event.target.checked);
  };

  const handleSubmit = () => {
    if (consent) {
      // Save consent to the database
      console.log('User consent given');
    } else {
      console.log('User consent not given');
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">User Consent</h2>
      <p className="text-gray-700 mb-4">
        Please provide your consent for data collection and processing activities.
      </p>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={consent}
          onChange={handleConsentChange}
          className="mr-2"
        />
        <span className="text-sm text-gray-600">I consent to data collection and processing.</span>
      </label>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4">
        Submit
      </button>
    </div>
  );
};

export default ConsentForm;