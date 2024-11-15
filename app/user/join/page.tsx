import { Metadata } from 'next';
import Link from 'next/link';
import UserJoinForm from '@/components/forms/user-join-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import prisma from '@/prisma/client';

export const metadata: Metadata = {
  title: 'B-Push Dashboard',
  description: 'B-Push Dashboard. for ToyProject',
};

export default async function AuthenticationPage() {
  const companys = await prisma.companys.findMany({
    take: 10,
  });

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8',
        )}
      >
        B-Push Dashboard
      </Link>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          B-Push Dashboard
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>&ldquo;Just Do It.&rdquo;</p>
            <footer className='text-sm'></footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign Up</h1>
            <p className='text-sm text-muted-foreground'>
              가입을 완료하기 위해 서비스 이용을 위한 추가 정보를 입력해주세요.
            </p>
          </div>
          <UserJoinForm company={companys} />
          {/* <p className='px-8 text-center text-sm text-muted-foreground'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </Link>
            .
          </p> */}
        </div>
      </div>
    </div>
  );
}