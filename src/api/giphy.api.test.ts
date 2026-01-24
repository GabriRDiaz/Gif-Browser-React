import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy";

describe('giphyApi',()=>{

    test('should be configured properly',()=>{
        const URL = 'https://api.giphy.com/v1/gifs';
        expect(giphyApi.defaults.baseURL).toBe(URL)
        expect(giphyApi.defaults.params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY)
    })
})