import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getRequestContext } from '@cloudflare/next-on-pages'

// This defines the "Shape" of your Cloudflare Environment
interface CloudflareEnv {
  DB: D1Database;
}

const prismaClientSingleton = () => {
  // We cast the environment to the interface we just defined
  const runtime = getRequestContext().env as CloudflareEnv;
  const adapter = new PrismaD1(runtime.DB);
  return new PrismaClient({ adapter });
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()
export default prisma
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
