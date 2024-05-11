import { auth } from "@clerk/nextjs";

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const authObject = auth();
    const body = await req.json();
    const { name } = body;
    if (!authObject.userId || !authObject.claims.roles?.some((role: string) => ['owner', 'admin'].includes(role))) {
      return new Response("Unauthenticated or unauthorized", { status: 401 });
    }

    if (!name) {
      return new Response("Name is required", { status: 400 });
    }

    if (!prisma) {
      return new Response("Database connection error", { status: 500 });
    }

    const store = await prisma.store.updateMany({
      where: {
        id: params.storeId,
        OR: [
          { userId: userId },
          { collaborators: { some: { userId: userId, role: 'admin' } } }
        ]
      },
      data: { name }
    });

    return new Response(JSON.stringify(store), { status: 200 });
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new Response("Internal error", { status: 500 });
  }
};