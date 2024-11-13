'use client';

import { Checkbox } from '@/components/ui/checkbox';
// import { Company } from '@/constants/data';
import { CompanyItem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<CompanyItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'ID',
    header: 'No',
  },
  {
    accessorKey: 'COMPANY_CODE',
    header: '회사코드',
  },
  {
    accessorKey: 'COMPANY_NAME',
    header: '회사명',
  },
  {
    accessorKey: 'CREATED_DT',
    header: '가입일',
    cell: ({ row }) => {
      const createDate = row.original.CREATED_DT;
      return `
        ${createDate?.getFullYear()}-${createDate?.getMonth()}-${createDate?.getDay()}`;
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
