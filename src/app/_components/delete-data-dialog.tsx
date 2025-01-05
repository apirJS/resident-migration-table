import { Button } from '../../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { CellContext } from '@tanstack/react-table';
import React from 'react';
import { deleteResident } from '../../db/service';
import { isServiceMethodSuccess } from '../../lib';

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

export default function DeleteDataDialog({
  table,
  row: { index, original },
}: Props) {
  async function handleDeleteRow() {
    const result = await deleteResident(original.id);
    if (!isServiceMethodSuccess(result)) {
      alert(result.message);
    }

    table.options.meta?.deleteData(index);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>
          <Trash2 />
          <span>Hapus Data</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yaking?</AlertDialogTitle>
          <AlertDialogDescription>
            Data akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteRow}>Ya</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
