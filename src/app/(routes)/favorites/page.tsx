"use client"

import useFavorite from "@/app/hooks/use-favorite";
import { post } from "@/components/articles";
import Favorite from "@/components/favorie";
import Link from "next/link";

export default function Favorites () {
    const {favoritePosts, isFavorite, handleFavorite} = useFavorite();

    if(favoritePosts?.length === 0) {
        return  <section className='flex flex-col gap-2 items-center justify-center h-screen'>
            <h1 className="font-bold text-xl">No Article Found</h1>
            <p className="text-sm">Try to favorite articles.</p>
        </section>
    }

    return (
        <section className='flex flex-col gap-4 w-4/5 my-10 mx-auto '>
            {favoritePosts?.map((post: post) => (
                <Link key={post.id} href={"/" + post.title.trim().replaceAll(" ", "-") + '-' + post.id} className='relative'>
                <Favorite isFavorite={isFavorite(post)} handleFavorite={() => handleFavorite(post)} />
                <div className="bg-gray-50 py-10 px-6 shadow-md rounded flex flex-col gap-2 items-start cursor-pointer">
                    <h1 className='font-bold'>{post.title}</h1>
                    <span className='text-xs'>{post.user.name}</span>
                </div>
                </Link>
            ))}
        </section>
      );
}