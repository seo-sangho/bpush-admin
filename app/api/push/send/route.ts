import { NextRequest, NextResponse } from 'next/server';
import { sendFCMNotification } from '@/lib/fcm-utils';
import admin from 'firebase-admin';

export async function POST(request: NextRequest, response: NextResponse) {
  const { title, content, pushTokens = [] } = await request.json();
  if (!content || (!pushTokens && !Array.isArray(pushTokens))) {
    return NextResponse.json(
      { code: 400, error: 'pushTokens is null' },
      { status: 400 },
    );
  }

  if (pushTokens.length > 501) {
    return NextResponse.json(
      { code: 400, error: `push tokens is max 500(${pushTokens.length})` },
      { status: 400 },
    );
  }
  // response
  let failTokens: string[] = [];

  // TODO pushTokens을 조회해보고 있는 녀석들 보내고, 없는 녀석들은 에러로 리턴
  // const push: admin.messaging.TokenMessage = {
  //   // token:
  //   // 'cU0mnmCz7iiyVHHfpKJhKJ:APA91bHahpRWP3l3xW8mxnFI_ca-K77iViNrdAGwgn6cjWZTPSJbDW36Zg1gU_1U-3hObAZ6ax5li7LKOcttulQaxlCv3VPVYa86DuFVtRsCtkv9esgqo68',
  //   token: pushTokens[0].pushToken,
  //   notification: {
  //     title: title ?? 'B-PUSH',
  //     body: content,
  //     imageUrl:
  //       'https://images.freeimages.com/clg/images/32/326218/uci-approved-logo_f.jpg',
  //   },
  //   // click_action: '', // url
  // };

  const messages = toTokens(title, content, pushTokens);

  try {
    const r = await sendFCMNotification(messages);
    console.log(`r: ${JSON.stringify(r)}`);
  } catch (err: any) {
    if (err instanceof Error) {
      return NextResponse.json(
        { code: 500, error: err.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { code: 500, error: 'unknown error' },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { code: 201, error: '', value: { fail_push_token: failTokens } },
    { status: 201 },
  );
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
        title: !title ? 'B-PUSH' : title,
        body: content,
        imageUrl:
          'https://images.freeimages.com/clg/images/32/326218/uci-approved-logo_f.jpg',
      },
    });
  });

  return push;
}
