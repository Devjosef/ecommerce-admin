import prismadb from "@/lib/prismadb";

/**
 * Get the count of paid orders for a specific store.
 * @param {string} storeId - The ID of the store.
 * @returns {Promise<number>} The count of paid orders.
 */
export const getSalesCount = async (storeId: string): Promise<number> => {
  const paidOrdersCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return paidOrdersCount;
};
