'use client';

import useFavorite from '@/app/hooks/use-favorite';
import Favorite from '@/components/favorie';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface post {
    id: number;
    title: string;
    user : {
      name: string;
    }
  }

  const Articles = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
  
    const query = searchParams.get('q')
    const queryPage = searchParams.get('page')
  
    const [page, setPage] = useState(1);
  
    const GET_ARTICLES = gql`
    query {
      posts (options: {
        search: {
          q: "${query ? query : ""}"
        },
        paginate: {
          page: ${page},
          limit: 10
        }
      }){
        data {
          id,
          title,
          user {
            name
          }
        }
      }
    }
  `;
  
    const { loading, error, data, refetch } = useQuery(GET_ARTICLES);
  
    const {isFavorite, handleFavorite} = useFavorite();
  
    const handlePaging = (page: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("page", page.toString())
      const queries = params.toString();
      router.push(pathname + "?" + queries)
    }
  
    useEffect(() => {
      if(page === 1) {
        return router.push(pathname);
      }
      handlePaging(page)
    },[page])
  
    useEffect(() => {
      refetch();
    },[queryPage])
  
    useEffect(() => {
    if(!query) {
      return router.push(pathname);
    }
      refetch();
    },[query])
  
    if(loading) {
      return <section className='flex flex-col gap-4'>
        {new Array(10).fill(null).map((_, i) => (
          <Skeleton key={i} className='w-full h-32' />
        ))}
        </section>
    }
  
    if(error) {
      return <section className='flex flex-col gap-2 items-center justify-center h-screen'>
        <h1 className="font-bold text-xl">Uh No! Something Went Wrong</h1>
        <p className="text-sm">Check your connection and try again.</p>
      </section>
    }
  
    if(data?.posts?.data?.length === 0) {
      return <section className='flex flex-col gap-2 items-center justify-center h-screen'>
        <h1 className="font-bold text-xl">No Article Found</h1>
        <p className="text-sm">Try to search for something else.</p>
      </section>
    }
  
    return (
      <>
        <section className='flex flex-col gap-4'>
          {data?.posts?.data?.map((post: post) => (
            <Link key={post.id} href={"/" + post.title.trim().replaceAll(" ", "-") + '-' + post.id} className='relative'>
              <Favorite isFavorite={isFavorite(post)} handleFavorite={() => handleFavorite(post)} />
              <div className="bg-gray-50 py-10 px-6 shadow-md rounded flex flex-col gap-2 items-start cursor-pointer">
                  <h1 className='font-bold'>{post.title}</h1>
                  <span className='text-xs'>{post.user.name}</span>
              </div>
            </Link>
          ))}
        </section>
        <Pagination>
          <PaginationContent>
            <PaginationItem onClick={() => {
                if(page - 1 !== 0) setPage(e => e - 1)
              }}>
              <PaginationPrevious />
            </PaginationItem>
            {/* <PaginationItem>
              <PaginationLink>1</PaginationLink>
              <PaginationLink>1</PaginationLink>
              <PaginationLink>1</PaginationLink>
            </PaginationItem> */}
            <PaginationItem onClick={() => {
                setPage(e => e + 1)
              }}>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </>
    );
  }

  export default Articles;