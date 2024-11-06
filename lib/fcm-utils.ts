import admin, { ServiceAccount } from 'firebase-admin';

// API 호출 시 전달할 데이터 타입
// export interface admin.messaging.TokenMessage {
//   message: {
//     token: string; // 토큰
//     notification: {
//       title: string; // 제목
//       body: string; // 내용
//       // image: string; // 이미지(아이콘)
//       // click_action: string; // url
//     };
//   };
// }

export const sendFCMNotification = async (
  data: admin.messaging.TokenMessage[],
) => {
  const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // 푸시 알림 전송 대상 토큰
  // const notificationData = { data };

  // 푸시 알림 전송
  const res = await admin.messaging().sendEach(data);
  return res;
};
