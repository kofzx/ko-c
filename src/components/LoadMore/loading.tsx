import React, { FC } from 'react'

export interface AtLoadingProps {
    size?: string | number;
    color?: string | number;
}

export const AtLoading: FC<AtLoadingProps> = (props) => {
    const { size, color } = props
    const sizeStyle = {
        width: size || '',
        height: size || '',
    }
    const colorStyle = {
        'border': color ? `1px solid ${color}` : '',
        borderColor: color ? `${color} transparent transparent transparent` : '',
    }
    const ringStyle = Object.assign({}, colorStyle, sizeStyle)
    return (
        <div className='at-loading' style={sizeStyle}>
            <div className='at-loading__ring' style={ringStyle}></div>
            <div className='at-loading__ring' style={ringStyle}></div>
            <div className='at-loading__ring' style={ringStyle}></div>
        </div>
    )
}

AtLoading.defaultProps = {
    size: 0,
    color: '',
}