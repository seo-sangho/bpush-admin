'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'COMPANY_CODE',
    header: '회사코드',
  },
  {
    accessorKey: 'LOGIN_ID',
    header: '사용자 ID',
  },
  {
    accessorKey: 'NAME',
    header: '이름',
  },
  {
    accessorKey: 'PROVIDER',
    header: '로그인 서비스',
  },
  {
    accessorKey: 'UUID',
    header: '로그인 서비스 임시 ID',
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
