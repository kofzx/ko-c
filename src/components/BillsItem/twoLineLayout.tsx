import React, { FC } from 'react'
import { LayoutProps, GoodsProps } from './PropTypes'

type TwoLineLayoutProps = LayoutProps & GoodsProps

export const TwoLineLayout: FC<TwoLineLayoutProps> = (props) => {
    const {
        goodsName,
        renderContent
    } = props
    return (
        <>
            <h2 className='bills-item-title'>{goodsName}</h2>
            {renderContent 
                ? (typeof renderContent === 'function' ? renderContent() : renderContent) 
                : null
            }
        </>
    )
}