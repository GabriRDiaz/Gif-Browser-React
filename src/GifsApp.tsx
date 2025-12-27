import { CustomHeader } from './shared/components/CustomHeader'
import { SearchBar } from './shared/components/SearchBar'
import { PreviousSearches } from './gifs/components/PreviousSearches'
import { GifList } from './gifs/components/GifList'
import { useGif } from './gifs/hooks/useGif'

export const GifsApp = () => {
    const { handleSearch, handlePreviousSearchClick, useSearch, useGifList } = useGif()

    return (
        <>
            <CustomHeader title="Buscador de Gifs" subtitle="Explora diferentes Gifs" />
            <SearchBar onQuery={(handleSearch)} />
            <PreviousSearches searches={useSearch} onLabelClicked={(handlePreviousSearchClick)} />
            <GifList gifList={useGifList} />
        </>
    )
}
