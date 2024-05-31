import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const getStore = async (storeId: string) => {
    return prismadb.store.findUnique({
        where: { id: storeId }
    });
};

export const updateStore = async (storeId: string, data: any) => {
    return prismadb.store.update({
        where: { id: storeId },
        data
    });
};

export const deleteStore = async (storeId: string) => {
    return prismadb.store.delete({
        where: { id: storeId }
    });
};

export const getAllStores = async () => {
    const stores = await prismadb.store.findMany({
        include: {
            products: true // Assuming you want to count products in each store
        }
    });
    return stores.map(store => ({
        ...store,
        products: store.products.filter(product => !product.isArchived) // Example of using filter
    }));
};

export const handleError = (message: string, status: number, error?: any) => {
    console.error(message, error);
    return new NextResponse(JSON.stringify({ error: message }), { status: status });
};
