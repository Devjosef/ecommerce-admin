import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function PATCH (
    req:Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const session = auth.getSession();
        const userId = session?.userId;

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

        const store = await prismadb.store.update({
            where: {
                id: params.storeId,
                OR: [
                    { userId },
                    { collaborators: { some: { userId, role: { in: ['admin', 'owner'] } } } ]
                ]
            },
            data: {
                name
            }
        });

        return NextResponse.json(store);
} catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

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
