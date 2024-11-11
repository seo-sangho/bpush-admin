import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import admin from 'firebase-admin';
import { sendFCMNotification } from '@/lib/fcm-utils';

// type ResponseData = {
//   message: string;
// };

export async function POST(
  request: NextRequest,
  { params }: { params: { companyCode: string } },
) {
  const { title, content } = await request.json();

  console.log(params.companyCode, title, content);

  const isExist = await prisma.companys.findFirst({
    where: {
      COMPANY_CODE: params.companyCode,
    },
  });
  if (!isExist) {
    return NextResponse.json(
      { code: 404, error: '알수 없는 company code' },
      { status: 200 },
    );
  }

  const targets = await prisma.push_token.findMany({
    where: {
      COMPANY_CODE: params.companyCode,
    },
  });

  let tokens: any = [];
  targets.forEach((t) => tokens.push({ pushToken: t.PUSH_TOKEN }));

  const tokenMessages = toTokens(title, content, tokens);

  try {
    sendFCMNotification(tokenMessages);
  } catch (error) {
    return NextResponse.json(
      { code: 500, error: 'Error send FCM Notification' },
      { status: 200 },
    );
  }

  return NextResponse.json({ code: 200, error: '' }, { status: 200 });
}

/** Client에서 수신한 데이터를 fcm Message 구조 변경 */
function toTokens(
  title: string,
  content: string,
  token: any[],
): admin.messaging.TokenMessage[] {
  let push: admin.messaging.TokenMessage[] = [];

  token.forEach((element) => {
    const { pushToken } = element;
    push.push({
      token: pushToken,
      notification: {
        title: title ?? 'B-PUSH',
        body: content,
        imageUrl:
          'https://images.freeimages.com/clg/images/32/326218/uci-approved-logo_f.jpg',
      },
    });
  });

  return push;
}
