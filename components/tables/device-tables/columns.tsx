'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '../user-tables/cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { push_token } from '@prisma/client';

export const columns: ColumnDef<push_token>[] = [
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
    accessorKey: 'PUSH_TOKEN',
    header: 'Device Token',
    cell: ({ row }) => {
      if (!row.original.PUSH_TOKEN) {
        return '';
      }

      if (row.original.PUSH_TOKEN.length > 64) {
        return row.original.PUSH_TOKEN.substring(0, 64) + '...';
      }

      return row.original.PUSH_TOKEN;
    },
    maxSize: 64,
  },
  {
    accessorKey: 'USER_ID',
    header: '사용자 ID',
  },
  {
    accessorKey: 'COMPANY_CODE',
    header: '회사 코드',
  },
  {
    accessorKey: 'BROWSER_TYPE',
    header: '브라우저 종류',
    cell: ({ row }) => {
      const d = row.original.BROWSER_TYPE ?? '';
      if (!d) {
        return '';
      }

      // TODO 이하 리팩토링 해야됨. agent 정보가 생각보다 길어서 일단 split 후에 뒤쪽만 노출
      const t = d.split(' ');
      if (t.length > 2) {
        return t[t.length - 2] + ' ' + t[t.length - 1];
      }

      if (t.length == 1) {
        return t[0];
      }
    },
  },
  {
    accessorKey: 'EXPIRE_DT',
    header: 'Token 유효시간',
    cell: ({ row }) => {
      const d = row.original.EXPIRE_DT ?? '';
      if (!d) {
        return '';
      }

      return d.toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row} />,
  // },
];
