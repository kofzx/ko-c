import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

import likeOffPng from '../assets/like-off.png'
import likeOnPng from '../assets/like-on.png'

export interface LikeProps {
    /** 是否已点赞 */
    isLikeOn: boolean;
    /** 自定义最外层wrapper的样式名 */
    className?: string;
    /** 选中时的图片名称或图片链接 */
    likeOn?: string;
    /** 未选中时的图片名称或图片链接 */
    likeOff?: string;
    onClick?: (isLikeOn: boolean) => void;
}

/**
 * 点赞组件
 * 
 * ###引用
 * 
 * ~~~js
 * import { Like } from 'ko-c'
 * ~~~
 */
export const Like: FC<LikeProps> = (props) => {
    const { 
        isLikeOn,
        className,
        likeOn,
        likeOff,
        onClick
    } = props
    const [ innerIsLikeOn, setIsLikeOn ] = useState(true)
    const classes = classNames('like-box', className)
    const likeOffClasses = classNames(
        'like-img',
        {
            'bounceIn': !innerIsLikeOn,
            'scaleOut': innerIsLikeOn
        }
    )
    const likeOnClasses = classNames(
        'like-img',
        {
            'bounceIn': innerIsLikeOn,
            'scaleOut': !innerIsLikeOn
        }
    )

    const handleClick = () => {
        setIsLikeOn(!innerIsLikeOn)
        onClick && onClick(!innerIsLikeOn)
    }

    useEffect(() => {
        if (innerIsLikeOn !== isLikeOn) {
            setIsLikeOn(isLikeOn)
        }
    }, [isLikeOn])

    return (
        <div className={classes}>
            <img
                className={likeOffClasses}
                src={likeOff}
                alt=""
                onClick={() => handleClick()} />
            <img
                className={likeOnClasses}
                src={likeOn}
                alt=""
                style={{display: innerIsLikeOn ? 'block' : 'none'}}
                onClick={() => handleClick()} />
        </div>
    )
}

Like.defaultProps = {
    likeOn: likeOnPng,
    likeOff: likeOffPng
}