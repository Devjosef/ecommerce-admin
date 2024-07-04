import { useEffect, useState } from 'react';
import { getRealTimeAnalytics } from '@/services/analyticsService';
import { AnalyticsData } from '@/types/analytics';

const useRealTimeAnalytics = (storeId: string) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const data = await getRealTimeAnalytics(storeId);
        setAnalyticsData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    fetchAnalyticsData();

    const interval = setInterval(fetchAnalyticsData, 60000); // Fetch data every minute

    return () => clearInterval(interval);
  }, [storeId]);

  return { analyticsData, loading, error };
};

export default useRealTimeAnalytics;