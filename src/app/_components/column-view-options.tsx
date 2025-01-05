'use client';

import { Table } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';

import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

interface ColumnViewOptionsProps<TData> {
  table: Table<TData>;
}

function transformColumnName(columnName: string) {
  let newColumnName = columnName;
  switch (columnName) {
    case 'nik':
      newColumnName = 'NIK';
      break;
    case 'name':
      newColumnName = 'Nama';
      break;
    case 'address':
      newColumnName = 'Alamat';
      break;
    case 'phone_number':
      newColumnName = 'Nomor Telepon';
      break;
    case 'gender':
      newColumnName = 'Jenis Kelamin';
      break;
    case 'status':
      newColumnName = 'Status';
      break;
    case 'created_at':
      newColumnName = 'Tercatat Pada';
      break;
    case 'is_local_resident':
      newColumnName = 'Warga Lokal';
      break;
    default:
      break;
  }
  return newColumnName;
}

export function ColumnViewOptions<TData>({
  table,
}: ColumnViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto px-4 py-2 h-8 flex'
        >
          <Settings2 />
          Kolom
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        <DropdownMenuLabel>Toggle Kolom</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' &&
              column.getCanHide() &&
              column.id !== 'actions'
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {transformColumnName(column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
