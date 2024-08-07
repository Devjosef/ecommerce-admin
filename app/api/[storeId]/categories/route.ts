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

       const { name, billboardId } = body;
        
       if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401});
        }
    
        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400});
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

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        });

        console.log('Category created:', category);
        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORIES_POST]', error);
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

            const categories = await prismadb.category.findMany({
                where: {
                  storeId: params.storeId
                },
            });
    
            console.log('Categories retrieved:', categories);
            return NextResponse.json(categories);
        } catch (error) {
            console.log('[CATEGORIES_GET]', error);
            return new NextResponse("Internal error", { status: 500});
        }
    
        };