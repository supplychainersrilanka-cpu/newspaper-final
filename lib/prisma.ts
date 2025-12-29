import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const getPrisma = () => {
  try {
    const runtime = getRequestContext() as any;
    const d1 = runtime?.env?.DB;
    
    if (!d1) {
      console.warn("D1 Binding 'DB' not found. Site is running in offline mode.");
      return null;
    }
    
    const adapter = new PrismaD1(d1);
    return new PrismaClient({ adapter });
  } catch {
    return null;
  }
}
