import { NextApiRequest, NextApiResponse } from 'next';
import prisma  from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { userId } = req.body;

    try {
      await prisma.user.delete({
        where: { id: userId },
      });

      res.status(200).json({ message: 'User data deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user data', error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}