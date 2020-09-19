import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

import starSolid from '../assets/star-solid.svg'
import starRegular from '../assets/star-regular.svg'

export interface StarProps {
    /** 自定义最外层wrapper的样式名 */
    className?: string;
    /** 是否为只读状态 */
    readonly?: boolean;
    /** 图片大小，默认单位为 px */
    size?: number;
    /**  图片间距，默认单位为 px */
    margin?: number;
    /** 图片总数 */
    count?: number;
    /** 当前分值 */
    value?: number;
    /** 选中时的图片名称或图片链接 */
    starOn?: string;
    /** 未选中时的图片名称或图片链接 */
    starOff?: string;
    /** 评分发生变化时触发的事件 */
    onChange?: (value: number) => void;
}

/**
 * 星级评分组件
 * 
 * ###引用
 * 
 * ~~~js
 * import { Star } from 'ko-c'
 * ~~~
 */
export const Star: FC<StarProps> = (props) => {
    const {
        className,
        readonly,
        size,
        margin,
        count,
        value,
        starOn,
        starOff,
        onChange
    } = props
    const classes = classNames(
        'star-box', 
        className,
        {
            'star-box--readonly': readonly
        } 
    )
    const [ stars, setStars ] = useState<boolean[]>([])
    const [ innerValue, setInnerValue ] = useState(0)

    const updateStars = () => {
        let stars: boolean[] = Array.from({
            length: count
        }, function (_, index) {
            return index < innerValue
        })
        
        setStars(stars)
    }

    const handleChange = (index: number) => {
        if (!readonly) {
            setInnerValue(index + 1)
            onChange && onChange(index + 1)
        }
    }

    useEffect(() => {
        if (innerValue !== value) {
            setInnerValue(value)
        }
    }, [value])

    useEffect(() => {
        updateStars()
    }, [count, innerValue])

    return (
        <div className={classes}>
            {
                stars.map((star, index) => {
                    return (
                        <img
                            key={`star-${index}`}
                            className={classNames(
                                { 'star-on': star },
                                { 'star-off': !star }
                            )}
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                marginRight: `${margin}px`,
                                display: readonly ? !star ? 'none' : 'block' : 'block'
                            }}
                            src={star ? starOn : starOff}
                            alt=""
                            onClick={() => handleChange(index)} />
                    )
                })
            }
        </div>
    )
}

Star.defaultProps = {
    size: 15,
    margin: 4,
    count: 5,
    value: 0,
    starOn: starSolid,
    starOff: starRegular
}