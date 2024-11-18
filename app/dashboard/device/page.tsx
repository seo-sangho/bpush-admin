import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Devices } from '@/components/tables/device-tables/devices';
// import { users } from '@/constants/data';
import prisma from '@/prisma/client';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Device', link: '/dashboard/device' },
];

export default async function page() {
  const devices = await prisma.push_token.findMany({
    where: {
      DEL_YN: 'N',
    },
    orderBy: [{ EXPIRE_DT: 'desc' }],
  });

  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />
        <Devices data={devices} />
      </div>
    </PageContainer>
  );
}
