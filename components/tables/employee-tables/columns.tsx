'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Employee>[] = [
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
    header: 'NO',
  },
  {
    accessorKey: 'COMPANY_CODE',
    header: 'CODE',
  },
  {
    accessorKey: 'COMPANY_NAME',
    header: 'NAME',
  },
  {
    accessorKey: 'CREATED_DT',
    header: 'Create DT',
  },
  // {
  //   accessorKey: 'gender',
  //   header: 'GENDER',
  // },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
