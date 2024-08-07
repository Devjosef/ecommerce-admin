import { NextApiRequest, NextApiResponse } from 'next';
import { AnalyticsData } from '@/types/analytics';

// Mock analytics data
const analyticsData: AnalyticsData = {
  sales: 1000,
  visitors: 5000,
  conversionRate: 0.2,
  averageOrderValue: 50,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { storeId } = req.query;

    // Here you would fetch real analytics data based on the storeId
    // For now, we return mock data
    res.status(200).json(analyticsData);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}