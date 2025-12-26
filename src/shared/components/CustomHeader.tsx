import React from 'react'

interface Props {
    title: string,
    subtitle: string
}

export const CustomHeader = ({ title, subtitle }: Props) => {
    return (
        <div>
            <div className="content-center">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}
