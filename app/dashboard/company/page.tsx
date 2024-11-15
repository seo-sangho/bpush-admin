'use server';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { columns } from '@/components/tables/company-tables/columns';
import { CompanyTable } from '@/components/tables/company-tables/company';
// import { buttonVariants } from '@/components/ui/button';
// import { Heading } from '@/components/ui/heading';
// import { Separator } from '@/components/ui/separator';
// import { Employee } from '@/constants/data';
// import { cn } from '@/lib/utils';
// import { Plus } from 'lucide-react';
// import Link from 'next/link';
import prisma from '@/prisma/client';
// import PushMessageDialog from '@/components/device/push-message-dialog';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Company', link: '/dashboard/company' },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const company = await prisma.companys.findMany();

  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  // const country = searchParams.search || null;
  // const offset = (page - 1) * pageLimit;

  // const res = await fetch(
  //   `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
  //     (country ? `&search=${country}` : ''),
  // );

  // const employeeRes = await res.json();
  const totalUsers = company.length; //1000
  const pageCount = Math.ceil(company.length / pageLimit);
  // const employee: Employee[] = employeeRes.users;

  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />

        <CompanyTable
          searchKey='COMPANY_CODE'
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          // @ts-ignore
          data={company}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
