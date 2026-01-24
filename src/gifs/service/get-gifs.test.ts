import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from 'axios-mock-adapter'

import { getGifsByQuery } from "./get-gif";
import { giphyApi } from "../../api/giphy";

import { giphyResponseMock } from "../../../tests/mocks/giphy.response.data";

describe('getGifsByQuery',()=>{

    let mock = new AxiosMockAdapter(giphyApi)

    beforeEach(()=>{
        mock = new AxiosMockAdapter(giphyApi)
    });

    test('should return a list of gifs', async()=>{
        // const gifs = await getGifsByQuery('vinland saga');
        // expect(gifs.length).toBe(10);
        
        // const [gif] = gifs;

        //  expect(gif).toStrictEqual({
        //     id: expect.any(String),
        //     title: expect.any(String),
        //     url: expect.any(String),
        //     width: expect.any(Number),
        //     height: expect.any(Number)
        // })
    })
    
    test('should return a list of gifs', async()=>{
    
        mock.onGet('/search').reply(200, giphyResponseMock)
        const gifs = await getGifsByQuery('vinland saga')
        
        expect(gifs.length).toBe(10)

        expect(gifs.forEach((gif)=>{
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        }))

    })

    test('should return an empty list of gifs on empty query', async()=>{
        const gifs = await getGifsByQuery('');
        expect(gifs.length).toBe(0);
    })

    test('should return an empty list of gifs on empty query', async()=>{
        
        const consoleErrorSpy = vi.spyOn(console,'error').mockImplementation(()=>{});
        
        mock.onGet('/search').reply(400,{
            data: {
                message: 'Bad Request',
            },
        });

        const gifs = await getGifsByQuery('vinland saga');
        
        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything())
    })
})