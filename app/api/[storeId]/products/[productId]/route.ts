import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { validateProductData, fetchProduct, handleError } from "@/lib/productUtils";

export async function GET(req: Request, { params }: { params: { productId: string } }) {
    console.log('GET request received:', req.method, params);
    
    try {
        const product = await fetchProduct(params.productId);
        if (!product) {
            console.log('Product not found');
            return handleError("Product not found", 404);
        }
        console.log('Product retrieved:', product);
        return NextResponse.json(product);
    } catch (error) {
        console.log('Error retrieving product:', error);
        return handleError("Internal error", 500, error);
    }
}

export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
    console.log('PATCH request received:', req.method, req.body, params);
    
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
        console.log('Product updated:', updatedProduct);
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.log('Error updating product:', error);
        return handleError("Internal error", 500, error);
    }
}

export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
    console.log('DELETE request received:', req.method, req.body, params);
    
    try {
        const deletedProduct = await prismadb.product.delete({
            where: { id: params.productId }
        });
        console.log('Product deleted:', deletedProduct);
        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.log('Error deleting product:', error);
        return handleError("Internal error", 500, error);
    }
}