import React, { useState } from 'react';
import axios from 'axios';

const DataRequestForm: React.FC<{ storeId: string }> = ({ storeId }) => {
  const [userId, setUserId] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);
  const [message, setMessage] = useState<string>('');

  const handleDataAccess = async () => {
    try {
      const response = await axios.get(`/api/${storeId}/dataaccess`, { params: { userId } });
      setUserData(response.data);
      setMessage('User data retrieved successfully');
    } catch (error) {
      setMessage('Error retrieving user data');
    }
  };

  const handleDataDeletion = async () => {
    try {
      await axios.delete(`/api/${storeId}/datadeletion`, { data: { userId } });
      setUserData(null);
      setMessage('User data deleted successfully');
    } catch (error) {
      setMessage('Error deleting user data');
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Data Access and Deletion</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleDataAccess} className="bg-blue-500 text-white px-4 py-2 mr-2">
        Access Data
      </button>
      <button onClick={handleDataDeletion} className="bg-red-500 text-white px-4 py-2">
        Delete Data
      </button>
      {message && <p className="text-gray-700 mt-4">{message}</p>}
      {userData && (
        <pre className="bg-gray-100 p-4 mt-4 rounded-md">
          {JSON.stringify(userData, null, 2)}
        </pre>
      )}
    </div>
  );
};

const DataRequestPage: React.FC<{ params: { storeId: string } }> = ({ params }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DataRequestForm storeId={params.storeId} />
      </div>
    </div>
  );
};

export default DataRequestPage;