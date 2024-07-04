import axios from 'axios';
import { AnalyticsData } from '@/types/analytics';

export const getRealTimeAnalytics = async (storeId: string): Promise<AnalyticsData> => {
  try {
    const response = await axios.get(`/api/analytics?storeId=${storeId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching real-time analytics data');
  }
};