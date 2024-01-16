import prismadb from "@/lib/prismadb";

/**
 * Get the total revenue for a specific store.
 * @param {string} storeId - The ID of the store.
 * @returns {Promise<number>} The total revenue.
 */
export const getTotalRevenue = async (storeId: string): Promise<number> => {
  const totalRevenue = (
    await prismadb.order.findMany({
      where: {
        storeId,
        isPaid: true,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    })
  ).reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
