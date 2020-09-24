import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

export interface BillsItemProps {
    /** 自定义最外层wrapper的样式名 */
    className?: string;
    /** 商品图片 */
    imageUrl?: string;
    children?: ReactNode;
    onClick?: () => void;
}

/**
 * 账单布局组件
 * 
 * ###引用
 * 
 * ~~~js
 * import { BillsItem, TwoLineLayout, ThreeLineLayout, PriceFeatureBox } from 'ko-c'
 * ~~~
 * 
 * <p style='font-size: 14px;color: #999;margin-bottom: 0;'>*注：TwoLineLayout, ThreeLineLayout, PriceFeatureBox都是可选的搭配组件，用于定制您的账单布局</p>
 * <p style='font-size: 13px;color: #999;margin: 0;'>解释：</p>
 * <p style='font-size: 13px;color: #999;text-indent: 12px;margin: 0;'>TwoLineLayout: 两行布局</p>
 * <p style='font-size: 13px;color: #999;text-indent: 12px;margin: 0;'>ThreeLineLayout: 三行布局</p>
 * <p style='font-size: 13px;color: #999;text-indent: 12px;margin: 0;'>PriceFeatureBox: 封装好的带价格的盒子，其中，右边空白块可以定制内容</p>
 */
export const BillsItem: FC<BillsItemProps> = (props) => {
    const { 
        className,
        imageUrl,
        children,
        onClick
    } = props
    const classes = classNames('bills-item', className)

    return (
        <div className={classes} onClick={onClick}>
            <div className='bills-item-img' style={{backgroundImage: `url(${imageUrl})`}}>

            </div>
            <div className='bills-item-main'>
                {children}
            </div>
        </div>
    )
}