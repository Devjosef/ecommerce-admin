import prismadb from "@/lib/prismadb";

/**
 * Get the count of non-archived products for a specific store.
 * @param {string} storeId - The ID of the store.
 * @returns {Promise<number>} The count of non-archived products.
 */
export const getStockCount = async (storeId: string): Promise<number> => {
  const nonArchivedProductCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return nonArchivedProductCount;
};
