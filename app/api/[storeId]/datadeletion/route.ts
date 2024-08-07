import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request received:', req.method, req.body);
  
  if (req.method === 'DELETE') {
    const { userId } = req.body;
    console.log('User ID:', userId);

    try {
      const deletedUser = await prisma.user.delete({
        where: { id: userId },
      });

      console.log('User deleted:', deletedUser);
      res.status(200).json(deletedUser);
    } catch (error) {
      console.log('Error deleting user data:', error);
      res.status(500).json({ message: 'Error deleting user data', error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}