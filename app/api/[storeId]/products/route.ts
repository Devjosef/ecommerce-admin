import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { Image } from "@prisma/client";

// Extract validation logic into a utility function
interface ProductInput {
    name: string;
    price: number; // Note: Prisma uses Decimal, but in TypeScript, we use number for handling decimals
    categoryId: string;
    colorId: string;
    sizeId: string;
    images: ImageInput[]; // Reflecting relation and ensuring it matches the Prisma model
}

interface ImageInput {
    url: string; // Matching the Prisma schema for Image
}

const validateProductInput = (body: ProductInput) => {
    const { name, price, categoryId, colorId, sizeId, images } = body;
    const errors: string[] = [];
    if (!name) errors.push("Name is required");
    if (price === undefined || price === null) errors.push("Price is required"); // More precise check for price
    if (!categoryId) errors.push("Category is required");
    if (!colorId) errors.push("Color Id is required");
    if (!sizeId) errors.push("Size id is required");
    if (!images || images.length === 0) errors.push("At least one image is required");
    return errors;
};

export async function POST(
    req: Request,
    { params }: {params: {storeId: string } }
) {
    try {
       const { userId } = auth();
       const body = await req.json();

      const { 
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images,
        isFeatured,
        isArchived
       } = body;
        
       const errors = validateProductInput(body);
       if (errors.length > 0) {
            return new NextResponse(JSON.stringify({ errors }), { status: 400 });
        }
    
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401});
        }
    
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
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

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                colorId,
                sizeId,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", { status: 500});
    }

    };

    export async function GET(
        req: Request,
        { params }: {params: {storeId: string } }
    ) {
        try {
            const { searchParams } = new URL(req.url);
            const categoryId = searchParams.get("categoryId") || undefined;
            const colorId = searchParams.get("colorId") || undefined;
            const sizeId = searchParams.get("sizeId") || undefined;
            const isFeatured= searchParams.get("isFeatured");

          if (!params.storeId) {
                return new NextResponse("Store id is required", { status: 400});
            }

            const products = await prismadb.product.findMany({
                where: {
                  storeId: params.storeId,
                  categoryId,
                  colorId,
                  sizeId,
                  isFeatured: isFeatured ? true : undefined,
                  isArchived: false
                },
                include: {
                    images: true,
                    category: true,
                    color: true,
                    size: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
    
            return NextResponse.json(products);
        } catch (error) {
            console.log('[PRODUCTS_GET]', error);
            return new NextResponse("Internal error", { status: 500});
        }
    }
