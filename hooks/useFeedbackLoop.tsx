import { useEffect } from 'react';
import { collectUserFeedback } from '@/services/feedbackService';

const useFeedbackLoop = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      collectUserFeedback();
    }, 604800000); // Run weekly

    return () => clearInterval(interval);
  }, []);
};

export default useFeedbackLoop;