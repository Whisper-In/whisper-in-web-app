import { IProfileDto, IProfileSearchDto } from "@/server-dtos/profile/profile.server-dtos";
import classNames from "classnames";
import SearchListItem from "./search-list-item.component";

export default function SearchList({ className, searchResults }
    : { className?: string, searchResults?: IProfileSearchDto[] }) {
    return (
        <div className={classNames(
            "overflow-y-auto pt-2",
            className
        )}>
            {
                searchResults?.length ?
                    searchResults.map((result) =>
                        <SearchListItem profile={result} />
                    )
                    :
                    <div className="mt-3 text-center">
                        No results found.
                    </div>
            }
        </div>
    )
}