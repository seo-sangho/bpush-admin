import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const res = await prisma.push_token.create({
    data: {
      PUSH_TOKEN: 'ttttt',
    },
  });
  return Response.json('ok!');
}
