import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  try {
    const paidOrders = await prismadb.order.findMany({
      where: {
        storeId,
        isPaid: true
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
      const orderTotal = order.orderItems.reduce((orderSum, item) => {
        return orderSum + item.product.price.toNumber();
      }, 0);
      return total + orderTotal;
    }, 0);

    return totalRevenue;
  } catch (error) {
    console.error('Error calculating total revenue:', error);
    throw new Error('Failed to calculate total revenue due to an internal error');
  }
};