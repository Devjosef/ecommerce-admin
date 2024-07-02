import React from 'react';
import { FaLock, FaShieldAlt, FaFileContract, FaUserShield, FaUserCheck } from 'react-icons/fa';

const SecurityCompliance: React.FC = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Security and Compliance</h2>
      <p className="text-gray-700 mb-4">
        We take your security and privacy seriously. Here are some of the measures we have in place to protect your data and ensure compliance with industry standards.
      </p>
      <ul className="space-y-2">
        <li className="flex items-center">
          <FaLock className="mr-2 text-blue-500" />
          <div>
            <strong>Two-Factor Authentication (2FA)</strong>
            <p className="text-sm text-gray-600">Enhance account security by requiring a second form of authentication.</p>
          </div>
        </li>
        <li className="flex items-center">
          <FaShieldAlt className="mr-2 text-green-500" />
          <div>
            <strong>Data Encryption</strong>
            <p className="text-sm text-gray-600">Protect sensitive data with industry-standard encryption techniques.</p>
          </div>
        </li>
        <li className="flex items-center">
          <FaFileContract className="mr-2 text-yellow-500" />
          <div>
            <strong>Regular Security Audits</strong>
            <p className="text-sm text-gray-600">Conduct regular audits to identify and mitigate security vulnerabilities.</p>
          </div>
        </li>
        <li className="flex items-center">
          <FaUserShield className="mr-2 text-red-500" />
          <div>
            <strong>GDPR and CCPA Compliance</strong>
            <p className="text-sm text-gray-600">Ensure compliance with GDPR and CCPA regulations to protect user privacy.</p>
          </div>
        </li>
        <li className="flex items-center">
          <FaUserCheck className="mr-2 text-purple-500" />
          <div>
            <strong>User Consent Management</strong>
            <p className="text-sm text-gray-600">Manage user consent for data collection and processing activities.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SecurityCompliance;