import { Skeleton, Tab, Tabs } from "@mui/material";
import StatItem from "./[profileId]/_component/stat-item.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { PostType } from "@/dtos/content/post.dtos";

export default function Loading() {
    return (
        <main className="h-screen flex flex-col">
            <div className="flex flex-col items-center gap-3 pt-14 px-5 mb-3">
                <Skeleton variant="circular" width={96} height={96} />

                <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
                <div className="flex justify-center gap-12 mb-3">
                    <StatItem label="Posts" value={0} />
                    <StatItem label="Followers" value={0} />
                    <StatItem label="Likes" value={0} />
                </div>

                <Skeleton variant="rounded" sx={{ width: "100%", height: 48, borderRadius: 48 }} />

                <Tabs variant="fullWidth" value={PostType.PHOTO} sx={{ width: '100%' }}>
                    <Tab icon={<FontAwesomeIcon icon={faImage} fontSize={20} />} value={PostType.PHOTO} />
                    <Tab icon={<FontAwesomeIcon icon={faVideo} fontSize={20} />} value={PostType.VIDEO} />
                </Tabs>
            </div>
        </main>
    );
}