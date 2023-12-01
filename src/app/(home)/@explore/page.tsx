"use client"

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "./_components/search-input.component";
import SearchList from "./_components/search-list.component";
import React, { useState } from "react";
import { IProfileDto, IProfileSearchDto } from "@/dtos/profile/profile.dtos";
import { searchProfiles } from "@/store/services/profile/profile.service";
import Header from "@/app/_components/header.component";

export default function Explore() {
    const [searchResults, setSearchResults] = useState<IProfileSearchDto[]>();

    const onSearchInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value;

        console.log(event.target)
        console.log(query)

        searchProfiles(query).then((results) => {
            setSearchResults(results);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <main className="w-full h-full flex flex-col">
            <Header>
                <SearchInput className="w-full" onChange={onSearchInput} />
            </Header>

            <SearchList searchResults={searchResults} />
        </main>
    )
}