import React, { FC, ReactNode } from 'react'
import { GoodsProps } from './PropTypes'

export interface PriceFeatureBoxProps extends GoodsProps {
    children?: ReactNode;
}

export const PriceFeatureBox: FC<PriceFeatureBoxProps> = (props) => {
    const { 
        goodsPrice,
        children 
    } = props
    return (
        <div className='bills-item-feature'>
            <p className='bills-price'>
                <span className='bills-price-yuan'>￥</span>
                {goodsPrice}
            </p>
            {children}
        </div>
    )
}