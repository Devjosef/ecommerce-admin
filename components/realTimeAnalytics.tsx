import React from 'react';
import useRealTimeAnalytics from '@/hooks/useRealTimeAnalytics';
import { AnalyticsData } from '@/types/analytics';

const RealTimeAnalytics: React.FC<{ storeId: string }> = ({ storeId }) => {
  const { analyticsData, loading, error } = useRealTimeAnalytics(storeId);

  if (loading) {
    return <p>Loading analytics data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!analyticsData) {
    return <p>No analytics data available.</p>;
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Real-time Analytics</h2>
      <ul className="space-y-2">
        <li>
          <strong>Sales:</strong> {analyticsData.sales}
        </li>
        <li>
          <strong>Visitors:</strong> {analyticsData.visitors}
        </li>
        <li>
          <strong>Conversion Rate:</strong> {analyticsData.conversionRate * 100}%
        </li>
        <li>
          <strong>Average Order Value:</strong> ${analyticsData.averageOrderValue}
        </li>
      </ul>
    </div>
  );
};

export default RealTimeAnalytics;