'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { Skeleton } from './skeleton';
import { useEffect, useState } from 'react';

export default function ChangeTheme({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (theme) {
      setMounted(true);
    }
  }, [theme]);

  if (!theme || !mounted) {
    return <Skeleton className={`w-24 h-8 ${className}`} />;
  }

  return (
    <Select onValueChange={(value) => setTheme(value)}>
      <SelectTrigger
        className={`sm:w-24 border dark:border-white/20 ${className}`}
      >
        <SelectValue placeholder='Theme' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
