import ToggleTheme from './changeTheme';
// import SidebarOpenButton from './sidebar-open-button';

export default function Header() {
  return (
    <header className='flex z-10 fixed inset-x-0 min-h-14 justify-center items-center dark:bg-neutral-800 dark:border-b-0 dark:shadow-none border-b-2 border-zinc-300 shadow-sm dark:text-white text-black  '>
      <h1 className=' tracking-wide hidden sm:inline'>Data Perpindahan Penduduk</h1>
      <div className='hidden absolute left-5 sm:flex items-center space-x-4'>
        {/* <SidebarOpenButton /> */}
        <ToggleTheme />
      </div>
      <div className='sm:hidden w-full flex justify-between items-center grow-0 px-5'>
        {/* <SidebarOpenButton /> */}
        <ToggleTheme className='w-24'/>
      </div>
    </header>
  );
}
