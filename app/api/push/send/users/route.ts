import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import admin from 'firebase-admin';
import { sendFCMNotification } from '@/lib/fcm-utils';
import { user } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const { title, content, users } = await request.json();
    console.log(`/api/push/send/users ${title} ${content} ${users}`);
    // TODO validation

    users.forEach(async (user: user) => {
      // get push token for user
      const targets = await prisma.push_token.findMany({
        where: {
          USER_ID: user.LOGIN_ID,
          DEL_YN: 'N',
        },
      });

      let tokens: any = [];
      targets.forEach((push_token) =>
        tokens.push({ pushToken: push_token.PUSH_TOKEN }),
      );

      // to FCM Message
      const tokenMessages = toTokens(title, content, tokens);

      try {
        sendFCMNotification(tokenMessages);
      } catch (error) {
        return NextResponse.json(
          { code: 500, error: 'fail send FCM' },
          { status: 200 },
        );
      }
    });
  } catch (error) {
    console.error(`${error}`);
    return NextResponse.json({ code: 500, error: `${error}` }, { status: 500 });
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
