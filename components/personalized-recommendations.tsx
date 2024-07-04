import React, { useEffect, useState } from 'react';
import { getRecommendations } from '@/services/recommendationService';

interface Recommendation {
  id: string;
  name: string;
}

const PersonalizedRecommendations: React.FC<{ userId: string }> = ({ userId }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data: Recommendation[] = await getRecommendations(userId);
        setRecommendations(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recommendations');
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
      <ul className="space-y-2">
        {recommendations.map((item) => (
          <li key={item.id} className="text-gray-700">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalizedRecommendations;