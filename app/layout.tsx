import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

// 다음과 같이 로컬 폰트 변수를 생성한다.
const pretendard = localFont({
  // 아래와 같이 굵기 별로 폰트를 지정해 사용할 수 있다.
  src: [
    {
      path: '../public/fonts/PretendardVariable.woff2',
      // weight: ...
    },
  ],
});

export const metadata: Metadata = {
  title: 'B-Push ToyProject',
  description: 'B-Push Dashboard. for ToyProject',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang='ko'>
      <body
        className={`${pretendard.className} overflow-hidden`}
        suppressHydrationWarning
      >
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
