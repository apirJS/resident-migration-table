'use server';

// import { getResidents } from '@/db/service';
import { columns } from './_components/columns';
import DataTable from './_components/data-table';
import ErrorModal from '../components/ui/error-modal';
import { getDummyResidents, isServiceMethodSuccess } from '../lib';

export default async function Penduduk() {
  // const result = await getResidents(5000);
  const result = getDummyResidents(5000);

  if (!isServiceMethodSuccess(result)) {
    return <ErrorModal error={result} />;
  }

  return (
    <div className='flex justify-center dark:bg-neutral-900 bg-white min-h-screen pt-14 w-full items-center'>
      <main className='xs:max-h-[80vh] xs:h-auto xs:w-[50vw] flex-col flex gap-2'>
        <DataTable columnsProp={columns} dataProp={result} />
      </main>
    </div>
  );
}
