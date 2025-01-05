import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { CellContext } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import EditDataDialog from './edit-data-dialog';
import DeleteDataDialog from './delete-data-dialog';

type Props = CellContext<
  {
    id: number;
    nik: string;
    name: string;
    gender: 'Male' | 'Female';
    address: string;
    original_address: string | null;
    phone_number: string;
    is_local_resident: boolean;
    status: 'Active' | 'Migrated';
    created_at: Date;
    updated_at: Date;
  },
  unknown
>;

export default function ActionsColumn(ctx: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <EditDataDialog {...ctx} />
        <DropdownMenuSeparator />
        <DeleteDataDialog {...ctx} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
