import { NextApiRequest, NextApiResponse } from 'next';

// Mock feedback data
const feedbackData = [
  { id: 1, user: 'User1', feedback: 'Great service!' },
  { id: 2, user: 'User2', feedback: 'Could be better.' },
  { id: 3, user: 'User3', feedback: 'Good experience overall.' },
  { id: 4, user: 'User4', feedback: 'Bad experience, needs improvement.' },
  { id: 5, user: 'User5', feedback: 'Very bad, not satisfied at all.' },
  { id: 6, user: 'User6', feedback: 'Excellent, highly recommend!' },
  { id: 7, user: 'User7', feedback: 'Average, could use some improvements.' },
  { id: 8, user: 'User8', feedback: 'Fantastic, will use again!' },
  { id: 9, user: 'User9', feedback: 'Not great, had some issues.' },
  { id: 10, user: 'User10', feedback: 'Terrible, very disappointed.' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return feedback data
    res.status(200).json(feedbackData);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}