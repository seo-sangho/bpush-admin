// import type { NextRequest, NextResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

// export async function GET(request: NextRequest, response: NextResponse) {
//   return NextResponse.json({ code: 200, msg: 'OK' }, { status: 201 });
// }

// const headers = {
//   'Access-Control-Allow-Origin': '*', // 모든 도메인 허용
//   'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type',
// };

// export async function OPTIONS(request: NextRequest, response: NextResponse) {
//   return new NextResponse(JSON.stringify({ message: 'Hello World' }), {
//     headers: headers,
//   });
// }

export async function POST(request: NextRequest, response: NextResponse) {
  console.log(`[API] --> /api/push/user/token/save`);
  const { userId, pushToken, companyCode, browserType } = await request.json();
  if (!userId || !pushToken || !companyCode || !browserType) {
    return NextResponse.json(
      { code: 400, error: 'parameter is null' },
      { status: 400 },
    );
  }

  try {
    await prisma.push_token.upsert({
      where: {
        PUSH_TOKEN: pushToken,
      },
      create: {
        PUSH_TOKEN: pushToken,
        USER_ID: userId,
        COMPANY_CODE: companyCode,
        BROWSER_TYPE: browserType,
        EXPIRE_DT: new Date(),
      },
      update: {
        PUSH_TOKEN: pushToken,
        USER_ID: userId,
        COMPANY_CODE: companyCode,
        BROWSER_TYPE: browserType,
        EXPIRE_DT: new Date(),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { code: 500, error: 'push token fail' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { code: 200, error: '' },
    // { status: 201, headers: headers },
    { status: 201 },
  );
}
