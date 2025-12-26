import React from 'react'

interface Props {
    searches: string[],
    onLabelClicked: (search: string) => void,
}
export const PreviousSearches = ({ searches, onLabelClicked }: Props) => {
    return (
        <div className="previous-searches">
            <h2>Búsquedas anteriores</h2>
            <ul className="previous-searches-list">
                {searches.map((s, index) => (
                    <li key={index}
                        onClick={() => onLabelClicked(s)}
                    >{s}</li>
                ))}
            </ul>
        </div>
    )
}
