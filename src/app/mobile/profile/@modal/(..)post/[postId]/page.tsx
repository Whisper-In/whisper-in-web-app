import PostPage from "@/app/mobile/post/[postId]/page";

export default function PostModal(props: {
    params: { postId: string }, searchParams: { [key: string]: string }
}) {
    return (
        <div className="w-full h-full">
            <PostPage params={props.params} searchParams={props.searchParams} />
        </div>
    );
}