import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/client';
// import { users } from '@/constants/data';
import prisma from '@/prisma/client';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
];
export default async function page() {
  const users = await prisma.users.findMany();
  return (
    <PageContainer>
      <div className='space-y-2'>
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </PageContainer>
  );
}
