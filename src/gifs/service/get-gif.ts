import axios from 'axios'
import { giphyApi } from '../../api/giphy';
import type { GiphyResponse } from '../interfaces/GiphyResponse';
import type { Gif } from '../interfaces/gif';

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
    if(query.trim().length===0) return [];
    try{
        const resp = await giphyApi<GiphyResponse>('/search', {
        params: {
            q: query,
            limit: 10,
        }
    });
    return resp.data.data.map((gif) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.original.url,
        width: Number(gif.images.original.width),
        height: Number(gif.images.original.height),
    }));
    }catch(error){
        console.error(error);
        return [];
    }
}