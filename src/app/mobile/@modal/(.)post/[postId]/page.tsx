import PostPage from "@/app/mobile/(pages)/post/[postId]/page";

export default function PostPageModal({ params, searchParams }
    : { params: { postId: string }, searchParams: { [key: string]: string | string[] } }) {
    return PostPage({ params, searchParams });
}