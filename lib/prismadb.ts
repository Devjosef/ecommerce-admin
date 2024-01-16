import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const globalPrisma = globalThis.prisma;
const prismaDb = globalPrisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaDb;
}

export default prismaDb;
