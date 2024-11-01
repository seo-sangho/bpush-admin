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
    header: 'COMPANY',
  },
  {
    accessorKey: 'LOGIN_ID',
    header: 'ID',
  },
  {
    accessorKey: 'NAME',
    header: 'NAME',
  },
  {
    accessorKey: 'PROVIDER',
    header: 'PROVIDER',
  },
  {
    accessorKey: 'UUID',
    header: 'PROVIDER RANDOM ID',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
