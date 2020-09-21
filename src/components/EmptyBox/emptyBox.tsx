import React, { FC } from 'react'
import classNames from 'classnames'

export interface EmptyBoxProps {
    /** 自定义图片 */
    emptyImage: string;
    /** 自定义文本 */
    emptyText: string;
    /** 自定义最外层wrapper的样式名 */
    className?: string;
}

/**
 * 空盒子（数据为空所展示的提示信息）
 * 
 * ###引用
 * 
 * ~~~js
 * import { EmptyBox } from 'ko-c'
 * ~~~
 */
export const EmptyBox: FC<EmptyBoxProps> = (props) => {
    const {
        emptyImage,
        emptyText,
        className
    } = props
    const classes = classNames('empty-box', className)

    return (
        <div className={classes}>
            <img className='empty-box-image' src={emptyImage} alt="" />
            <p className='empty-box-text'>{emptyText}</p>
        </div>
    )
}