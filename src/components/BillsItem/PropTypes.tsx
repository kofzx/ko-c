import { ReactNode } from 'react'

export interface LayoutProps {
    renderContent?: (() => ReactNode) | ReactNode;
}

export interface GoodsProps {
    /** 商品名称 */
    goodsName?: string;
    /** 商品价格 */
    goodsPrice?: string | number;
}