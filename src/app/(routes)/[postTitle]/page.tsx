"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { gql, useQuery } from "@apollo/client";

export default function PostPage ({ params }: { params: { postTitle: string} }) {

    const slug = params.postTitle.split('-');
    const postId = slug[slug.length - 1];

    const GET_ARTICLE = gql`
        query {
            post (id: "${postId}"){
                id,
                title,
                body,
                user {
                    name
                }
            }
            }
    `;

    const { loading, error, data } = useQuery(GET_ARTICLE);

    if(loading) {
        return <section className="w-4/5 mx-auto flex flex-col gap-4 my-10">
        <Skeleton className='w-full h-32' />
        <Skeleton className='w-20 h-10' />
        <Skeleton className='w-full h-[20vh]' />
    </section>
    }

    return (
        <section className="w-4/5 mx-auto my-10 flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{data?.post.title}</h1>
            <span>Write by : {data?.post.user.name}</span>
            <p>{data?.post.body}</p>
        </section>
    )
}