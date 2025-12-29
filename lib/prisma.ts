import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getRequestContext } from '@cloudflare/next-on-pages'

interface CloudflareEnv {
  DB: D1Database;
}

export const getPrisma = () => {
  try {
    const env = getRequestContext().env as CloudflareEnv;
    if (!env || !env.DB) {
      throw new Error("D1 Database binding 'DB' not found.");
    }
    const adapter = new PrismaD1(env.DB);
    return new PrismaClient({ adapter });
  } catch (e) {
    console.error("Prisma Initialization Error:", e);
    // Return a dummy client to prevent total crash on first load
    return new PrismaClient();
  }
}
