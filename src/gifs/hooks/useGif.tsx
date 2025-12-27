import React, { useState } from 'react'
import { getGifsByQuery } from '../service/get-gif'
import { mockGifs } from '../../mocks/gifs.mocks'
import type { Gif } from '../interfaces/gif'


export const useGif = () => {
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

    return {
        useSearch,
        useGifList,

        handlePreviousSearchClick,
        handleSearch,
    }

}
