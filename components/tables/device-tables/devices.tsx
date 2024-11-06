'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { push_token } from '@prisma/client';
import PushMessageDialog from '@/components/device/push-message-dialog';

interface DeviceToken {
  data: push_token[];
}

export const Devices: React.FC<DeviceToken> = ({ data }) => {
  const router = useRouter();

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
        <PushMessageDialog />
      </div>
      <Separator />
      <DataTable
        searchKey='name'
        columns={columns}
        data={data}
      />
    </>
  );
};
