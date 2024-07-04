import axios from 'axios';
import { Recommendation } from '@/types/recommendation';

export const getRecommendations = async (userId: string): Promise<Recommendation[]> => {
  try {
    const response = await axios.get(`/api/recommendations?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching recommendations');
  }
};