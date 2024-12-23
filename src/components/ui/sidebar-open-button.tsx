'use client';
import { AlignJustify } from 'lucide-react';
import { useSidebar } from './sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function SidebarOpenButton({
  className,
}: {
  className?: string;
}) {
  const { toggleSidebar } = useSidebar();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={() => toggleSidebar()} className={className}>
            <AlignJustify size={24} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open Sidebar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
