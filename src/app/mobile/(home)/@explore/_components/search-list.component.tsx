import { IProfileDto, IProfileSearchDto } from "@/dtos/profile/profile.dtos";
import classNames from "classnames";
import SearchListItem from "./search-list-item.component";
import { List } from "@mui/material";

export default function SearchList({ className, searchResults }
    : { className?: string, searchResults?: IProfileSearchDto[] }) {
    return (
        <List>
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
        </List>
    )
}