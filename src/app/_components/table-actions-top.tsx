import { Table } from '@tanstack/react-table';
import { ColumnViewOptions } from './column-view-options';
import ResetFilter from './reset-filter';
import AddDataDialog from './add-data-dialog';

export default function TableActionsTop<TData>({
  table,
  setData
}: {
  table: Table<TData>;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
}) {
  return (
    <div className=' flex items-center justify-between space-x-2 '>
      <AddDataDialog setData={setData}/>
      <div className='flex items-center gap-x-2 flex-col sm:flex-row gap-y-1'>
        <ResetFilter table={table} />
        <ColumnViewOptions table={table} />
      </div>
    </div>
  );
}
