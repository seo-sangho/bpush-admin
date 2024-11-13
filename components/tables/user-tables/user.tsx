'use client';
// import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import { User } from '@/constants/data';
// import { Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';
import PushMessageDialog from '@/components/device/push-message-dialog';
import { columns } from './columns';
import { user } from '@prisma/client';
import { sendPushForUsers } from '@/lib/api-utils';
// interface ProductsClientProps {
//   data: User[];
// }

interface UsersProps {
  data: user[];
}

export const UserClient: React.FC<UsersProps> = ({ data }) => {
  // const router = useRouter();
  let tableObject: any; // table object

  const handleSubmit = (title: string, content: string) => {
    const messages = {
      title: title ?? 'B-PUSH',
      content: content,
      users: [],
    };

    tableObject.getFilteredSelectedRowModel().rows.forEach((user: any) => {
      const { LOGIN_ID } = user.original;
      messages.users.push(LOGIN_ID);
    });

    sendPushForUsers(messages);
  };

  return (
    <>
      <div className='flex items-start justify-between'>
        <Heading
          title={`사용자 (${data.length})`}
          description='Manage users'
        />
        {/* <Button
          className='text-xs md:text-sm'
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button> */}
        <PushMessageDialog
          // submit={(title: string, content: string) => {
          //   console.log(`title:${title} content:${content}`);
          // }}
          submit={handleSubmit}
          selectedCount={() => {
            if (tableObject)
              return tableObject.getFilteredSelectedRowModel().rows.length;
            else return 0;
          }}
        />
      </div>
      <Separator />
      <DataTable
        searchKey='name'
        columns={columns}
        data={data}
        getTable={(t: any) => {
          tableObject = t;
        }}
      />
    </>
  );
};
