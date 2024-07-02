import { useEffect } from 'react';
import { performBackup, checkForUpdates, monitorPerformance } from '@/services/maintenanceService';

const useAutomatedMaintenance = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      performBackup();
      checkForUpdates();
      monitorPerformance();
    }, 86400000); // Run daily

    return () => clearInterval(interval);
  }, []);
};

export default useAutomatedMaintenance;
