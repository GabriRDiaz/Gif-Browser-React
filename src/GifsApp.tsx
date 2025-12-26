import React, { useState } from 'react'
import { mockGifs } from './mocks/gifs.mocks'
import { CustomHeader } from './shared/components/CustomHeader'
import { SearchBar } from './shared/components/SearchBar'
import { PreviousSearches } from './gifs/components/PreviousSearches'
import { getGifsByQuery } from './gifs/service/get-gif'
import { GifList } from './gifs/components/GifList'
import type { Gif } from './gifs/interfaces/gif'

export const GifsApp = () => {

    const [useSearch, setSearch] = useState<string[]>([])
    const [useGifList, setGifList] = useState<Gif[]>(mockGifs)

    const handlePreviousSearchClick = (useSearch: string) => {
        console.log(useSearch);
    }
    const handleSearch = async (query: string) => {
        query = query.trim().toLowerCase();
        if (query.length === 0)
            return
        if (useSearch.includes(query))
            return

        setSearch([query, ...useSearch].splice(0, 8));
        await getGifsByQuery(query);

        setGifList(await getGifsByQuery(query));
    }

    return (
        <>
            <CustomHeader title="Buscador de Gifs" subtitle="Explora diferentes Gifs" />
            <SearchBar onQuery={(handleSearch)} />
            <PreviousSearches searches={useSearch} onLabelClicked={(handlePreviousSearchClick)} />
            <GifList gifList={useGifList} />
        </>
    )
}
