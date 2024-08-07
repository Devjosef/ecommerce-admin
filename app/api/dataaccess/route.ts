import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '../../../lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId } = req.body;

    try {
      const userData = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user data', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}