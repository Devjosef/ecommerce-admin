import { initializeVendorServices, manageVendorServices } from '@/lib/vendorUtils';

export const setupVendorIntegration = async () => {
  await initializeVendorServices();
  await manageVendorServices();
};