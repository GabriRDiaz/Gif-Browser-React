import React from 'react'
import type { Gif } from '../interfaces/gif'

interface Props {
    gifList: Gif[]
}

export const GifList = ({ gifList }: Props) => {
    return (
        <div className="gifs-container">
            {gifList.map((gif) => (
                <div key={gif.id} className="gif-card">
                    <img src={gif.url} alt={gif.title} />
                    <h3>{gif.title}</h3>
                    <p>
                        {gif.width}x{gif.height} (1.5Mb)
                    </p>
                </div>
            ))}
        </div>
    )
}
