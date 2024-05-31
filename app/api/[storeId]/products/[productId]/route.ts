import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { validateProductData, fetchProduct, handleError } from "@/lib/productUtils";

export async function GET(req: Request, { params }: { params: { productId: string } }) {
    try {
        const product = await fetchProduct(params.productId);
        if (!product) {
            return handleError("Product not found", 404);
        }
        return NextResponse.json(product);
    } catch (error) {
        return handleError("Internal error", 500, error);
    }
}

export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
    try {
        const body = await req.json();
        const errors = validateProductData(body);
        if (errors.length > 0) {
            return handleError("Validation failed", 400, errors);
        }
        const updatedProduct = await prismadb.product.update({
            where: { id: params.productId },
            data: body
        });
        return NextResponse.json(updatedProduct);
    } catch (error) {
        return handleError("Internal error", 500, error);
    }
}

export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
    try {
        const deletedProduct = await prismadb.product.delete({
            where: { id: params.productId }
        });
        return NextResponse.json(deletedProduct);
    } catch (error) {
        return handleError("Internal error", 500, error);
    }
}