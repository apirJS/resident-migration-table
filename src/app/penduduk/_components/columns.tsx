'use client';

import { Button } from '@/components/ui/button';
import { residentsTable } from '@/db/schema';
import { Column, ColumnDef, Row, RowData } from '@tanstack/react-table';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import ActionsColumn from './actions-column';
import { ArrowUpDown } from 'lucide-react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'select';
  }
}

type Resident = typeof residentsTable.$inferSelect;

function BaseHeader(value: string, className?: string) {
  return <div className={`sm:min-w-[15em] px-2 ${className}`}>{value}</div>;
}

function BaseCell(value: string, className?: string) {
  return <div className={`sm:min-w-[10em] px-2 ${className}`}>{value}</div>;
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function Filter({ column }: { column: Column<Resident, unknown> }) {
  const { filterVariant } = column.columnDef.meta ?? {};

  const columnFilterValue = column.getFilterValue();
  const facetedUniqueValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = React.useMemo(
    () => Array.from(facetedUniqueValues.keys()).sort(),
    [facetedUniqueValues]
  );

  return filterVariant === 'text' ? (
    <>
      <datalist id={column.id + 'list'} key={column.id + 'list'}>
        {sortedUniqueValues.map((value) => (
          <option key={value} value={value} />
        ))}
      </datalist>
      <DebouncedInput
        key={column.id}
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        list={column.id + 'list'}
      />
    </>
  ) : (
    <Select onValueChange={(value) => column.setFilterValue(value)}>
      <SelectTrigger className={` border dark:border-white/20`}>
        <SelectValue placeholder={translations.headers[column.id]} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortedUniqueValues.map((value) => (
            <SelectItem value={value} key={value}>
              {translations.values[value] ?? value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const translations: {
  headers: { [key: string]: string };
  values: { [key: string]: string };
} = {
  values: {
    Male: 'Laki-laki',
    Female: 'Perempuan',
    true: 'Ya',
    false: 'Bukan',
    Active: 'Aktif',
    Migrated: 'Pindah',
  },
  headers: {
    status: 'Status',
    gender: 'Jenis Kelamin',
    is_local_resident: 'Warga Lokal',
  },
};

export const columns: ColumnDef<Resident>[] = [
  {
    accessorKey: 'actions',
    header: () => BaseHeader('Opsi', 'sm:min-w-[3em]'),
    cell: (ctx) => {
      return <ActionsColumn {...ctx} />;
    },
  },
  {
    accessorKey: 'nik',
    header: ({ column }) => (
      <div className='flex flex-col py-1'>
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          NIK
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
        <Filter key={column.id} column={column} />
      </div>
    ),
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div className='flex flex-col py-1'>
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nama
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
        <Filter key={column.id} column={column} />
      </div>
    ),
    cell: ({ row }) => BaseCell(row.original.name),
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <div className='flex flex-col py-1'>
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Alamat
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
        <Filter key={column.id} column={column} />
      </div>
    ),
    cell: ({ row }) => BaseCell(row.original.address),
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'original_address',
    header: ({ column }) => (
      <div className='flex flex-col py-1'>
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Alamat Asal
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
        <Filter key={column.id} column={column} />
      </div>
    ),
    cell: ({ row }) => BaseCell(row.original.original_address!),
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'phone_number',
    header: ({ column }) => (
      <div className='flex flex-col py-1'>
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nomor Telepon
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
        <Filter key={column.id} column={column} />
      </div>
    ),
    cell: ({ row }) => BaseCell(row.original.phone_number),
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => (
      <div className='flex flex-col py-1'>
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Jenis Kelamin
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
        <Filter key={column.id} column={column} />
      </div>
    ),
    cell: ({ row }) =>
      BaseCell(row.original.gender === 'Male' ? 'Laki-laki' : 'Perempuan'),
    meta: {
      filterVariant: 'select',
    },
    filterFn: (row: Row<Resident>, columnId: string, filterValue: string) => {
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div className='flex flex-col py-1'>
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status Kependudukan
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
        <Filter key={column.id} column={column} />
      </div>
    ),
    cell: ({ row }) =>
      BaseCell(row.original.status === 'Active' ? 'Aktif' : 'Pindah'),
    meta: {
      filterVariant: 'select',
    },
  },

  {
    accessorKey: 'is_local_resident',
    header: ({ column }) => (
      <div className='flex flex-col py-1'>
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Warga Lokal
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
        <Filter key={column.id} column={column} />
      </div>
    ),
    cell: ({ row }) =>
      BaseCell(row.original.is_local_resident ? 'Ya' : 'Bukan'),
    meta: {
      filterVariant: 'select',
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Tercatat Pada
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return BaseCell(
        date
          .toLocaleString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
          .replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$2-$1-$3')
      );
    },
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Diperbarui Pada
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.updated_at);
      return BaseCell(
        date
          .toLocaleString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
          .replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$2-$1-$3')
      );
    },
    meta: {
      filterVariant: 'text',
    },
  },
];
