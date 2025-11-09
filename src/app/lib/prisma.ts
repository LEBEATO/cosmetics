import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makePrisma() {
  try {
    return new PrismaClient({
      log: ["error"],
      errorFormat: "minimal",
    });
  } catch (e) {
    console.error("Failed to create Prisma client:", e);
    throw e;
  }
}

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;