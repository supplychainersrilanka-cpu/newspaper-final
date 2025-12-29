import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getRequestContext } from '@cloudflare/next-on-pages'

const prismaClientSingleton = () => {
  const runtime = getRequestContext().env;
  const adapter = new PrismaD1(runtime.DB);
  return new PrismaClient({ adapter });
}
declare global { var prisma: undefined | ReturnType<typeof prismaClientSingleton> }
const prisma = globalThis.prisma ?? prismaClientSingleton()
export default prisma
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
