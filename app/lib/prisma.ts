import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

function createPrismaClient() {
  const client = new PrismaClient({
    log: [
      process.env.NODE_ENV === 'development' ? 'query' : 'warn',
      'error',
      'info'
    ],
    __internal: {
      engine: {
        enableQueryEngine: true,
        experimental_disablePreparedStatement: true,
      },
    } as never, // prevent TS type issue
  });

  // Add connection middleware
  client.$use(async (params, next) => {
    try {
      return await next(params);
    } catch (error) {
      if (isConnectionError(error)) {
        console.log('Connection error detected, attempting to reconnect...');
        await client.$disconnect();
        await client.$connect();
        return next(params); // Retry the query
      }
      throw error;
    }
  });

  return client;
}

function isConnectionError(error: unknown): boolean {
  return error instanceof Error && (
    error.message.includes('prepared statement') ||
    error.message.includes('connection') ||
    error.message.includes('CONNECTION')
  );
}

// Cleanup on process exit
process.on('beforeExit', async () => {
  if (globalForPrisma.prisma) {
    await globalForPrisma.prisma.$disconnect();
  }
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}