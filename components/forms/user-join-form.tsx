'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  //   FormControl,
  FormField,
  //   FormItem,
  //   FormLabel,
  //   FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
// import { useSearchParams } from 'next/navigation';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CompanyItem } from '@/types';
// import GithubSignInButton from '../github-auth-button';
// import GoogleSignInButton from '../google-auth-button';
// import { ScrollArea } from '@radix-ui/react-scroll-area';
// import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
});
type UserFormValue = z.infer<typeof formSchema>;

export default function UserJoinForm({
  company = [],
}: {
  company: CompanyItem[];
}) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl');
  // const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: 'demo@gmail.com',
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    console.info(`joined ${data}`);

    signIn('google', { callbackUrl: '/dashboard' });
  };
  return (
    <>
      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email...'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className='ml-auto w-full'
            type='submit'
          >
            Continue With Email
          </Button>
        </form>
      </Form> */}

      {/* <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <p className='text-sm'>소셜 로그인</p> */}
      {/* <Form> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select a company' />
              </SelectTrigger>
              <SelectContent>
                {company.map((item) => (
                  <SelectItem
                    key={item.ID.toString()}
                    value={item.ID.toString()}
                  >
                    {item.COMPANY_NAME}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            // disabled={loading}
            variant='default'
            className='ml-auto w-full'
            type='submit'
          >
            가입 완료
          </Button>
        </form>
      </Form>
      {/* <GoogleSignInButton /> */}
      {/* <GithubSignInButton /> */}
      {/* <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or 신규가입
          </span>
        </div>
      </div> */}
    </>
  );
}
