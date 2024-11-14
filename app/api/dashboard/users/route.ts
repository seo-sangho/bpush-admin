import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// TypeError: Do not know how to serialize a BigInt 에러 때문에
// BigInt.prototype.toJSON = function () {
//   const int = Number.parseInt(this.toString());
//   return int ?? this.toString();
// };

// dashboard에서 요약화면용
export async function GET() {
  try {
    const res = await prisma.push_history.findMany({
      take: 5,
      orderBy: [
        {
          CREATED_DT: 'desc',
        },
        { ID: 'desc' },
      ],
    });

    return NextResponse.json(
      { code: 200, error: '', value: { data: res } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ code: 500, error: `${error}` }, { status: 500 });
  }
}
