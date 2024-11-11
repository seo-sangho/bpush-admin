'use client';

import { useState } from 'react';
// import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import { User } from '@/constants/data';
// import { Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { push_token } from '@prisma/client';
import PushMessageDialog from '@/components/device/push-message-dialog';
// import admin from 'firebase-admin';
//import axios from 'axios';
// import { time } from 'console';
import { sendPush } from '@/lib/api-utils';

interface DeviceToken {
  data: push_token[];
}

export const Devices: React.FC<DeviceToken> = ({ data }) => {
  // const router = useRouter();
  // const [table, setTable] = useState();
  let tt; // table object
  let _title: string;
  let _content: string;

  const handleSubmit = (title: string, content: string) => {
    // get title, content for push
    console.log(title, content);

    if (typeof title !== 'string' || typeof content !== 'string') return;

    _title = title;
    _content = content;

    const messages = {
      title: _title ?? 'B-PUSH',
      content: _content,
      pushTokens: [
        // {
        //   pushToken:
        //     'cU0mnmCz7iiyVHHfpKJhKJ:APA91bEwfwv2fuF1naneU-5HYDBJIA_TZwdjGW8puSBx4MtXtm1xZez1xXuZdWX85FtnFH3_ufA0WvUEP0x6C0VYnCFMYMHmMuJUiyRsxiqTRKO15ahCcw4',
        //   userId: 'test003@gmail.com',
        // },
      ],
    };

    tt.getFilteredSelectedRowModel().rows.forEach((token) => {
      console.log(token.original.PUSH_TOKEN, token.original.USER_ID);
      const temp = {
        pushToken: token.original.PUSH_TOKEN,
        userId: token.original.USER_ID,
      };

      messages.pushTokens.push(temp);
    });

    sendPush(messages);
  };

  // async function sendPush(messages) {
  //   const url = process.env.NEXT_PUBLIC_BPUSH_API ?? '';
  //   const api = process.env.NEXT_PUBLIC_BPUSH_API_PUSH ?? '';

  //   try {
  //     axios
  //       .post(url + api, messages)
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err: any) {
  //     console.log(`error: ${err}`);
  //   }
  // }

  return (
    <>
      <div className='flex items-start justify-between'>
        <Heading
          title={`Push Devices(${data.length})`}
          description='등록된 Device Key for Push'
        />
        {/* <Button
          className='text-xs md:text-sm'
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button> */}
        <PushMessageDialog
          submit={handleSubmit}
          selectedCount={() => {
            if (tt) return tt.getFilteredSelectedRowModel().rows.length;
            else return 0;
          }}
        />
      </div>
      <Separator />
      <DataTable
        searchKey='name'
        columns={columns}
        data={data}
        getTable={(t) => {
          tt = t;
        }}
      />
    </>
  );
};
