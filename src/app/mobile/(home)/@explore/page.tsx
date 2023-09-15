"use client"

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "./_components/search-input.component";
import SearchList from "./_components/search-list.component";
import React, { useState } from "react";
import { IProfileDto, IProfileSearchDto } from "@/server-dtos/profile/profile.server-dtos";
import { searchProfiles } from "@/app/_client-services/profile/profile.client-service";
import Header from "@/app/mobile/_components/header.component";

export default function Explore() {
    const [searchResults, setSearchResults] = useState<IProfileSearchDto[]>();

    const onSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value;

        searchProfiles(query).then((results) => {
            setSearchResults(results);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <main className="w-full h-full flex flex-col">
            <Header>
                <SearchInput onInput={onSearchInput} />
            </Header>

            <SearchList searchResults={searchResults} />
        </main>
    )
}