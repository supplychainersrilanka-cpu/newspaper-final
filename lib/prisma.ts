import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const getPrisma = () => {
  try {
    // Check if we are actually in the Cloudflare environment
    const context = getRequestContext() as any;
    const d1 = context?.env?.DB;
    
    if (!d1) {
      console.warn("D1 Binding 'DB' not detected.");
      return null;
    }
    
    const adapter = new PrismaD1(d1);
    return new PrismaClient({ adapter });
  } catch (err) {
    console.error("Prisma failed to initialize:", err);
    return null;
  }
}
