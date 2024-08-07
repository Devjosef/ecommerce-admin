import { NextApiRequest, NextApiResponse } from 'next';
import { Recommendation } from '@/types/recommendation';

// Mock recommendations data
const recommendations: Recommendation[] = [
  { id: '1', name: 'Product 1' },
  { id: '2', name: 'Product 2' },
  { id: '3', name: 'Product 3' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    // Here you would fetch real recommendations based on the userId
    // For now, we return mock data
    res.status(200).json(recommendations);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}