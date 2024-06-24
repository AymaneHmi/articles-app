'use client';

import Articles from '@/components/articles';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Home() {

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter();

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("q", query)
    const queries = params.toString();
    setTimeout(() => {
      router.push(pathname + "?" + queries)
    }, 100);
  }

  return (
    <div className='w-4/5 my-4 mx-auto flex flex-col gap-4'>
      <div className="flex flex-row items-center justify-between border rounded py-2 px-3">
        <Input
          placeholder='Search article title ..'
          className='border-none'
          onChange={(e) => handleSearch(e.target.value.toLowerCase())}
        />
        <Search size={20} />
      </div>
      <Articles />
    </div>
  );
}
