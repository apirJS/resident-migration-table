'use client';
import { PanelLeftClose } from 'lucide-react';
import { useSidebar } from './sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function SidebarCloseButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className='absolute right-2 top-3'
            onClick={() => toggleSidebar()}
          >
            <PanelLeftClose size={20} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Close Sidebar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
