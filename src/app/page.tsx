import { getResidents } from '@/db/service';
import { columns } from './_components/columns';
import DataTable from './_components/data-table';
import ErrorModal from '@/components/ui/error-modal';
import { getDummyResidents, isServiceMethodSuccess } from '@/lib';

export default async function Penduduk() {
  const result = process.env.NODE_ENV === "production" ? await getResidents(5000) : getDummyResidents(5000);
  if (!isServiceMethodSuccess(result)) {
    return <ErrorModal error={result} />;
  }

  return (
    <div className='flex justify-center dark:bg-neutral-900 bg-white min-h-screen pt-14 w-full items-center'>
      <main className='sm:max-h-[80vh] sm:h-auto sm:w-[50vw] flex-col flex gap-2'>
        <DataTable columnsProp={columns} dataProp={result} />
      </main>
    </div>
  );
}

/* 
import { getResidents } from '@/db/service';
import { columns } from './_components/columns';
import DataTable from './_components/data-table';
import ErrorModal from '@/components/ui/error-modal';
import { getDummyResidents, isServiceMethodSuccess } from '@/lib';

export default async function Penduduk() {
  const result = process.env.NODE_ENV === "production" ? await getResidents(5000) : getDummyResidents(5000);
  if (!isServiceMethodSuccess(result)) {
    return <ErrorModal error={result} />;
  }

  return (
    <div className='flex justify-center dark:bg-neutral-900 bg-white min-h-screen pt-14 w-full items-center'>
      <main className='sm:max-h-[80vh] sm:h-auto sm:w-[50vw] flex-col flex gap-2'>
        <DataTable columnsProp={columns} dataProp={result} />
      </main>
    </div>
  );
}

*/