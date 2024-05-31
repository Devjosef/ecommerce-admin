import { NextResponse } from "next/server";
import { processPayment, processRefund, handleError } from "@/services/webhookService";

export async function POST(req: Request) {
    try {
        const eventType = req.headers.get('X-Webhook-Event');
        const data = await req.json(); 
        switch (eventType) {
            case 'payment_success':
                await processPayment(data);
                break;
            case 'refund_processed':
                await processRefund(data);
                break;
            default:
                throw new Error('Unsupported event type');
        }
        return new NextResponse("Webhook processed", { status: 200 });
    } catch (error) {
        return handleError("Webhook error", 500, error);
    }
}

