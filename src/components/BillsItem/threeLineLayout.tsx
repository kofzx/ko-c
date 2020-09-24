import React, { FC } from 'react'
import { LayoutProps, GoodsProps } from './PropTypes'
import { PriceFeatureBox } from './priceFeatureBox'

type ThreeLineLayoutProps = LayoutProps & GoodsProps

export const ThreeLineLayout: FC<ThreeLineLayoutProps> = (props) => {
    const {
        goodsName,
        renderContent,
        ...restProps
    } = props
    return (
        <>
            <h2 className='bills-item-title'>{goodsName}</h2>
            {renderContent 
                ? (typeof renderContent === 'function' ? renderContent() : renderContent) 
                : null
            }
            <PriceFeatureBox {...restProps} />
        </>
    )
}