import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./client";
import { BillboardColumn } from "./[billboardId]/components/columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const orders = await prismadb..findMany({
        where: {
            storeId: params.storeId
        },
        inlude: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: BillboardColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.adress,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))
    
    return (
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient data={formattedBillboards} />
        
        </div>
        </div>
    );
}

export default BillboardsPage;