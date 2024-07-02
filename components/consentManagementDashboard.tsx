import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConsentManagementDashboard: React.FC = () => {
  const [consent, setConsent] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user consent status from the database
    const fetchConsentStatus = async () => {
      const response = await axios.get('/api/consentStatus');
      setConsent(response.data.consent);
    };

    fetchConsentStatus();
  }, []);

  const handleConsentChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newConsent = event.target.checked;
    setConsent(newConsent);

    // Update user consent status in the database
    await axios.post('/api/updateConsent', { consent: newConsent });
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Manage Your Consent</h2>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={consent}
          onChange={handleConsentChange}
          className="mr-2"
        />
        <span className="text-sm text-gray-600">I consent to data collection and processing.</span>
      </label>
    </div>
  );
};

export default ConsentManagementDashboard;