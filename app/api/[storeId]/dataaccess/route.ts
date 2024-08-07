import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request received:', req.method, req.body);

  if (req.method === 'POST') {
    const { userId } = req.body;
    console.log('User ID:', userId);

    try {
      const userData = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userData) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('User data retrieved:', userData);
      res.status(200).json(userData);
    } catch (error) {
      console.log('Error retrieving user data:', error);
      res.status(500).json({ message: 'Error retrieving user data', error });
    }
  } else if (req.method === 'GET') {
    const { userId } = req.query;
    console.log('User ID:', userId);

    try {
      const userData = await prisma.user.findUnique({
        where: { id: userId as string },
      });

      if (!userData) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('User data retrieved:', userData);
      res.status(200).json(userData);
    } catch (error) {
      console.log('Error retrieving user data:', error);
      res.status(500).json({ message: 'Error retrieving user data', error });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}