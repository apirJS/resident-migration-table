'use client';

import { ScrollArea, ScrollBar } from './scroll-area';

interface Props {
  error: Error;
}

export default function ErrorModal({ error }: Props) {
  return (
    <div className='fixed inset-0 flex justify-center items-center'>
      <div className='gap-5 shadow-md bg-zinc-900 text-white dark:bg-white dark:text-black p-4 rounded-lg sm:w-[25vw] sm:h-[30vh] flex-col flex items justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>Error</h2>
          <h4 className='text-sm'>Detail: </h4>
        </div>
        <ScrollArea>
          <div className='overflow-auto dark:text-gray-600'>
            <p className='break-all'>{error.message}</p>
          </div>
          <ScrollBar orientation='vertical' />
        </ScrollArea>
        <div className=' flex justify-center items-center text-sm'>
          <button
            className='w-[30%] bg-zinc-50 text-black dark:bg-black dark:text-white py-[4px] rounded-md active:scale-95 dark:hover:bg-zinc-800'
            onClick={() => window.location.reload()}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
