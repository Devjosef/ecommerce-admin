import { useEffect, useState } from 'react';
import { getRealTimeAnalytics } from '@/services/analyticsService';

const useRealTimeAnalytics = (storeId: string) => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const data = await getRealTimeAnalytics(storeId);
      setAnalyticsData(() => data);
    };

    fetchAnalyticsData();
  }, [storeId]);

  return { analyticsData };
};

export default useRealTimeAnalytics;