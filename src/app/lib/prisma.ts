// /app/lib/prisma.ts
export const runtime = "nodejs"; // 👈 반드시 추가

// import { PrismaClient } from "@/generated/prisma";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;