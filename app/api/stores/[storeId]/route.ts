import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function PATCH (
    req:Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const body = await req.json();
        const { name } = body;
            
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await updateStore(params.storeId, userId, name);
        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

async function updateStore(storeId: string, userId: string, newName: string) {
    return prismadb.store.update({
        where: { id: storeId, userId },
        data: { name: newName }
    });
}

export async function DELETE (
    req:Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
       
         if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            },
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
