import { getPostDetails } from "@/store/services/content/post.service";
import { notFound } from "next/navigation";
import Post from "@/app/_components/post.component";
import BackButton from "@/app/_components/back-button.component";
import { useGetPostDetails } from "@/store/hooks/content.hooks";

export default async function PostPage({ params, searchParams }
    : { params: { postId: string }, searchParams: { [key: string]: string | string[] } }) {
    const showAvatar = searchParams["showAvatar"] == "true";

    return (
        <main className="w-full h-full">
            <Post postId={params.postId} hideAvatar={!showAvatar} />

            <BackButton/>
        </main>
    );
}