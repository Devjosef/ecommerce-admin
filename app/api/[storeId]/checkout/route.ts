import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { createStripeSession, calculateTotalRevenue, createLineItems } from "@/lib/checkoutUtils";

interface Collaborator {
    id: string;
    email: string;
    name: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    revenueShare: number; // Assuming revenueShare is a percentage stored as a number
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { productIds } = await req.json();
        if (!productIds || productIds.length === 0) {
            return new NextResponse("Product ids are required", { status: 400 });
        }

        const products = await prismadb.product.findMany({
            where: { id: { in: productIds } }
        });

        if (products.length === 0) {
            return new NextResponse("Products not found", { status: 404 });
        }

        const line_items = createLineItems(products.map(product => ({
            name: product.name,
            price: product.price.toNumber()
        })));
        const totalRevenue = calculateTotalRevenue(products.map(product => ({
            price: product.price.toNumber()
        })));

        const store = await prismadb.store.findUnique({
            where: { id: params.storeId }
        });
        if (!store) {
            return new NextResponse("Store not found", { status: 404 });
        }

        // Handle collaborators and revenue sharing in a separate function or module
        await handleCollaborators(store.id, totalRevenue);

        const stripeSession = await createStripeSession(line_items, store.id);
        return NextResponse.json({ url: stripeSession.url });
    } catch (error) {
        console.log('[CHECKOUT_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
async function handleCollaborators(storeId: string, totalRevenue: number) {
    const collaborators: Collaborator[] = await prismadb.user.findMany({
        where: { stores: { some: { storeId: storeId } }, role: "collaborator" },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            revenueShare: true
        }
    });

    collaborators.forEach(async collaborator => {
        const earnings = totalRevenue * (collaborator.revenueShare / 100);
        await prismadb.user.update({
            where: { id: collaborator.id },
            data: {
                balance: { increment: earnings }  
            }
        });
    });
}
