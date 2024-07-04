import { initializeVendorServices, manageVendorServices } from '@/lib/vendorUtils';

export const setupVendorIntegration = async () => {
  try {
    await initializeVendorServices();
    await manageVendorServices();
    console.log('Vendor services initialized and managed successfully.');
  } catch (error) {
    console.error('Error setting up vendor integration:', error);
    throw new Error('Failed to setup vendor integration');
  }
};