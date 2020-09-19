import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

interface IFields {
    avatar: string;
    content: string;
}

export interface FakeNewsProps {
    /** 消息列表，可自定义项目字段名，详见fields */
    list: any[];
    /** 自定义项目字段名，格式为: { avatar: 'avatarUrl', content: 'content' } */
    fields: IFields;
    /** 自定义最外层wrapper的样式名 */
    className?: string;
}

const startPos = '100%', middlePos = 0, endPos = '-100%'
let timer1: any, timer2: any, timer3: any

/**
 * 滚动消息组件
 * 
 * ###引用
 * 
 * ~~~js
 * import { FakeNews } from 'ko-c'
 * ~~~
 */
export const FakeNews: FC<FakeNewsProps> = (props) => {
    const { 
        list, 
        fields, 
        className
    } = props
    const [ ty, setTy ] = useState<number | string>(startPos)
    const [ isTransition, setIsTransition ] = useState(true)
    const [ showItem, setShowItem ] = useState({
        [fields.avatar]: '',
        [fields.content]: ''
    })

    const classes = classNames('fake-news-box', className)

    const fakeAnim = async () => {
        if (timer1) {
            clearTimeout(timer1);
        }
        if (timer2) {
            clearTimeout(timer2);
        }
        
        function timeoutCallback() {
            setTy(middlePos)
            setIsTransition(true)
            timer1 = setTimeout(() => {
                setTy(endPos)
            }, 3000)
            return new Promise(resolve => {
                timer2 = setTimeout(() => {
                    setTy(startPos)
                    setIsTransition(false)
                    resolve()
                }, 3500)
            });
        }
        function startTimeout(i: number) {
            if (timer3) {
                clearTimeout(timer3)
            }
            setShowItem(list[i])
            return new Promise(resolve => {
                timer3 = setTimeout(() => {
                    timeoutCallback().then(() => resolve());
                }, 6000)
            });
        }
        for (let i = 0; i < list.length; i++) {
            await startTimeout(i)
        }
    }

    useEffect(() => {
        fakeAnim()
        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
        }
    }, [])

    return (
        <div className={classes}>
            <div
                className='fake-news-main'
                style={{
                    transform: `translate3d(0,${ty},0)`,
                    transition: isTransition ? 'transform 0.25s ease-in-out' : 'none'
                }}>
                <img className='fake-avatar' src={fields && showItem[fields.avatar]} alt=""/>
                <p className='fake-message'>{fields && showItem[fields.content]}</p>
            </div>
        </div>
    )
}

FakeNews.defaultProps = {
    list: [],
    fields: {
        avatar: 'avatar',
        content: 'content'
    }
}