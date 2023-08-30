import * as postExternalService from "@/external-services/content/post.external-service"

export default async function MobileHome() {
    const postsPerLoad = 5;
    const recommendedPosts = await postExternalService.getRecommendedPosts(postsPerLoad);
    const followingPosts = await postExternalService.getRecommendedPosts(postsPerLoad, [], true);

    return (
        <main className="overflow-y-scroll snap-y snap-mandatory">
            {
                recommendedPosts.map((post) =>
                    <div className="w-full h-full snap-always snap-center">
                        <img className="w-full h-full object-cover" src={post.postURL} />
                    </div>
                )
            }
        </main>
    );
}