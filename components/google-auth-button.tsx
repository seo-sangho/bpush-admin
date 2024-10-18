'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import Image from 'next/image';

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const imageLoader = ({}) => {
    return `https://cdn.simpleicons.org/Google`;
  };
  return (
    <Button
      className='w-full'
      variant='outline'
      type='button'
      onClick={() =>
        signIn('google', { callbackUrl: callbackUrl ?? '/dashboard' })
      }
    >
      <Image
        loader={imageLoader}
        src='google.png'
        width={12}
        height={12}
        alt=''
      />
      &nbsp;&nbsp;Continue with Google
    </Button>
  );
}
