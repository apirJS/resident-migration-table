import { Button } from '../../components/ui/button';
import { Table } from '@tanstack/react-table';

export default function ResetFilter<TData>({ table }: { table: Table<TData> }) {
  function handleClick() {
    table.setSorting([]);
    table.setColumnFilters([]);
    table.resetColumnFilters();
    table.resetPagination();
    table.resetColumnVisibility();
  }

  return (
    <Button variant='outline' className='px-2 py-2 h-8' onClick={handleClick}>
      Reset Filter
    </Button>
  );
}
