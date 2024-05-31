import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const fetchProduct = async (productId: string) => {
    return prismadb.product.findUnique({
        where: { id: productId }
    });
};

export const validateProductData = (data: any) => {
    const errors = [];
    if (!data.name) errors.push("Name is required");
    // Add more validations as necessary
    return errors;
};

export const handleError = (message: string, status: number, error?: any) => {
    console.error(message, error);
    return new NextResponse(JSON.stringify({ error: message }), { status });
};