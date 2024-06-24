"use client";

import Link from "next/link";

export default function Header () {
    return (
        <header className="bg-gray-50 py-4 px-6">
            <div className="w-4/5 mx-auto flex flex-row items-center justify-between">
                <Link href={'/'}>
                    <h1 className="font-bold text-2xl">Articly</h1>
                </Link> 
                <div className="flex flex-row gap-2 items-center">
                    <Link href={'/'} className="text-sm hover:underline">
                        Home
                    </Link> 
                    <Link href={'/favorites'} className="text-sm hover:underline">
                        Favorites
                    </Link> 
                </div>
            </div>
        </header>
    )
}