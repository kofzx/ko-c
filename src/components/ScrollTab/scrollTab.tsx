import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

interface IFields {
    name: string;
}

export interface ScrollTabProps {
    /** 标签列表，可自定义项目字段名，详见fields，默认传string[] */
    list?: any[];
    /** 选中的标签索引 */
    activeIndex?: number;
    /** 自定义项目字段名，格式为: { name: 'cate' } */
    fields?: IFields;
    /** 切换标签时触发的事件 */
    onChange?: (index: number) => void;
}

/**
 * 滚动标签栏组件
 * 
 * ###引用
 * 
 * ~~~js
 * import { ScrollTab } from 'ko-c'
 * ~~~
 */
export const ScrollTab: FC<ScrollTabProps> = (props) => {
    const {
        list,
        activeIndex,
        fields,
        onChange
    } = props
    const [ innerActiveIndex, setActiveIndex ] = useState(0)

    const handleChange = (index: number) => {
        setActiveIndex(index)
        onChange && onChange(index)
    }

    useEffect(() => {
        if (innerActiveIndex !== activeIndex) {
            typeof activeIndex === 'number' && (setActiveIndex(activeIndex))
        }
    }, [activeIndex])

    return (
        <div className='scroll-tab'>
            {
                Array.isArray(list) && list.map((item, index) => {
                    return (
                        <div
                            key={`scroll-tab-${index}`}
                            className={classNames(
                                'scroll-tab__item',
                                {
                                    'scroll-tab__item--active': innerActiveIndex === index
                                }
                            )}
                            onClick={() => handleChange(index)}
                        >
                            {(fields && item[fields.name]) || item}
                        </div>
                    )
                })
            }
        </div>
    )
}

ScrollTab.defaultProps = {
    list: [],
    activeIndex: 0,
    fields: {
        name: 'cate'
    },
}