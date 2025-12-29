import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getRequestContext } from '@cloudflare/next-on-pages'

interface CloudflareEnv {
  DB: D1Database;
}

export const getPrisma = () => {
  const runtime = getRequestContext().env as CloudflareEnv;
  const adapter = new PrismaD1(runtime.DB);
  return new PrismaClient({ adapter });
}
