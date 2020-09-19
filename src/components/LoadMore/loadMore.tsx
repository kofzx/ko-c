import React, { FC, CSSProperties } from 'react'
import classNames from 'classnames'
import { AtActivityIndicator } from './activityIndicator'

type statusType = 'loading' | 'noMore'

export interface AtLoadMoreProps {
    /** 自定义最外层wrapper的样式 */
    customStyle?: CSSProperties;
    /** 自定义最外层wrapper的样式名 */
    className?: string;
    /** "没有更多" 文本样式 */
    noMoreTextStyle?: CSSProperties;
    /** 加载组件的状态，可选值: 'loading' | 'noMore' */
    status?: statusType;
    /** "加载中" 的文本 */
    loadingText?: string;
    /** "没有更多" 的文本 */
    noMoreText?: string;
}

/**
 * 加载更多组件
 * 
 * ###引用
 * 
 * ~~~js
 * import { LoadMore } from 'ko-c'
 * ~~~
 */
export const AtLoadMore: FC<AtLoadMoreProps> = (props) => {
    const {
        customStyle,
        className,
        noMoreTextStyle,
        status,
        loadingText,
        noMoreText
    } = props
    
    let component = null
    if (status === 'loading') {
        component = <AtActivityIndicator mode='center' content={loadingText} />
    } else if (status === 'noMore') {
        component = <div
            className='at-load-more__text-box'
            style={noMoreTextStyle}
        >
            <span className='at-load-more__line'></span>
            <span className='at-load-more__tip'>{noMoreText}</span>
            <span className='at-load-more__line'></span>
        </div>
    }
    return (
        <div
            className={classNames('at-load-more', className)}
            style={customStyle}
        >
            {component}
        </div>
    )
} 

AtLoadMore.defaultProps = {
    customStyle: {},
    noMoreTextStyle: {},
    status: 'loading',
    loadingText: '加载中',
    noMoreText: '这是我的底线哦'
}