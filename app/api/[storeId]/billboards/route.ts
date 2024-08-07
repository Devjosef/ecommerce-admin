import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: {params: {storeId: string } }
) {
    console.log('POST request received:', req.method, req.body, params);
    
    try {
       const { userId } = auth();
       const body = await req.json();
       console.log('User ID:', userId);
       console.log('Request body:', body);

       const { label, imageUrl } = body;
        
       if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401});
        }
    
        if (!label) {
            return new NextResponse("Label is required", { status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
          where: {
            id: params.storeId,
            userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

        console.log('Billboard created:', billboard);
        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARDS_POST]', error);
        return new NextResponse("Internal error", { status: 500});
    }

    };

    export async function GET(
        req: Request,
        { params }: {params: {storeId: string } }
    ) {
        console.log('GET request received:', req.method, params);
        
        try {
          if (!params.storeId) {
                return new NextResponse("Store id is required", { status: 400});
            }

            const billboard = await prismadb.billboard.findMany({
                where: {
                  storeId: params.storeId
                },
            });
    
            console.log('Billboards retrieved:', billboard);
            return NextResponse.json(billboard);
        } catch (error) {
            console.log('[BILLBOARDS_GET]', error);
            return new NextResponse("Internal error", { status: 500});
        }
    
        };