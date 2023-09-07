import { getPostDetails } from "@/server-services/content/post.server-service";
import { notFound } from "next/navigation";
import Post from "@/components/post.component";
import BackButton from "@/app/mobile/_components/back-button.component";

export default async function PostPage({ params, searchParams }
    : { params: { postId: string }, searchParams: { [key: string]: string | string[] } }) {
    const post = await getPostDetails(params.postId);
    const showAvatar = searchParams["showAvatar"] == "true";

    if (!post) {
        return notFound();
    }

    return (
        <main className="w-full h-full bg-black">
            <Post post={post} hideAvatar={!showAvatar} />

            <BackButton />
        </main>
    );
}