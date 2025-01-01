import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TableActionsBottom<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  return (
    <div className='flex items-center justify-end space-x-2 py-4 select-none text-sm'>
      <div className='flex items-center gap-2 justify-between w-full'>
        <div className='flex items-center gap-1'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </Button>
        </div>
        <div className='flex items-center gap-2'>
          <span className='flex items-center gap-1'>
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className='flex items-center gap-1'>
            | Go to page:
            <Input
              type='number'
              min='1'
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className='border p-1 rounded w-16'
            />
          </span>
          <Select onValueChange={(value) => table.setPageSize(Number(value))}>
            <SelectTrigger className='sm:w-24 border dark:border-white/10 h-auto'>
              <SelectValue
                placeholder={`Show ${table.getState().pagination.pageSize}`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Page Size</SelectLabel>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    Show {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <span>{table.getPrePaginationRowModel().rows.length} Rows</span>
      </div>
    </div>
  );
}
