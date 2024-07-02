import { useEffect, useState } from 'react';
import { getPerformanceMetrics } from '@/services/performanceService';

const usePerformanceMonitoring = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      const data = await getPerformanceMetrics();
      setPerformanceData(data);
    };

    fetchPerformanceData();
  }, []);

  return { performanceData };
};

export default usePerformanceMonitoring;