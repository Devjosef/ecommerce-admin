import React, { useEffect, useState } from 'react';
import { getRecommendations } from '@/services/recommendationService';

const PersonalizedRecommendations: React.FC<{ userId: string }> = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const data: { id: string; name: string }[] = await getRecommendations(userId);
      setRecommendations(data);
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div>
      <h2>Recommended for You</h2>
      <ul>
        {recommendations.map((item: { id: string; name: string }) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalizedRecommendations;