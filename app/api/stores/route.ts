import { NextResponse } from "next/server";
import { getStore, handleError } from "@/services/storeService";

export async function GET(req: Request) {
    try {
        const storeId = req.url; 
        const stores = await getStore(storeId);
        if (!stores || !Array.isArray(stores)) {
            throw new Error("Stores data is not available or not in expected format");
        }
        const transformedStores = stores.map((store: { products: any[] }) => ({
            ...store,
            productsCount: store.products ? store.products.length : 0
        }));
        return NextResponse.json(transformedStores);
    } catch (error) {
        return handleError("Internal error", 500, error);
    }
}