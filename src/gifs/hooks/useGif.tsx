import React, { useRef, useState } from 'react'
import { getGifsByQuery } from '../service/get-gif'
import { mockGifs } from '../../mocks/gifs.mocks'
import type { Gif } from '../interfaces/gif'


export const useGif = () => {
    const [useSearch, setSearch] = useState<string[]>([])
    const [useGifList, setGifList] = useState<Gif[]>(mockGifs)
    const gifCache = useRef<Record<string, Gif[]>>({});

    const handlePreviousSearchClick = async (useSearch: string) => {
        console.log(gifCache)
        if (gifCache.current[useSearch]) {
            console.log("entra")
            setGifList(gifCache.current[useSearch]);
            return;
        }
        console.log("no entra")
        setGifList(await getGifsByQuery(useSearch));
    }

    const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase();
        if (query.length === 0)
            return
        if (useSearch.includes(query))
            return

        setSearch([query, ...useSearch].splice(0, 8));
        const gifs: Gif[] = await getGifsByQuery(query);

        setGifList(gifs);
        gifCache.current[query] = gifs;
    }

    return {
        useSearch,
        useGifList,

        handlePreviousSearchClick,
        handleSearch,
    }

}
