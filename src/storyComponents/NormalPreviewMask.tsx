import React, { FC, useState } from 'react'
import { PreviewMask, DataType } from '../components/PreviewMask/previewMask'

import './_normalPreviewMask.scss'
import playPng from '../components/assets/play.png'

const imgUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'
const posterUrl = 'https://developer.mozilla.org/static/img/favicon144.png'
const videoUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'


export interface NormalPreviewMaskProps {
    /** 预览的文件类型: 图片或视频 */
    dataType?: DataType;
    /** 文件的地址 */
    dataUrl?: string;
    /** 关闭遮罩事件 */
    onClose?: () => void;
}

/**
 * 预览图片/视频组件
 * 
 * ###引用
 * 
 * ~~~js
 * import { PreviewMask } from 'ko-c'
 * ~~~
 */
export const NormalPreviewMask: FC<NormalPreviewMaskProps> = (props) => {
    const [ activeDataType, setActiveDataType ] = useState<DataType>()
    const [ activeDataUrl, setActiveDataUrl ] = useState<string>()

    const handleClick = (dataType: DataType, dataUrl: string) => {
        setActiveDataType(dataType)
        setActiveDataUrl(dataUrl)
    }

    const onClose = () => {
        setActiveDataUrl('')
    }

    return (
        <>
            <img 
                className='img-item'
                src={imgUrl}
                alt=""
                onClick={() => handleClick('image', imgUrl)} />
            <div 
                className='img-wrapper' 
                style={{ marginLeft: '15px' }}
                onClick={() => handleClick('video', videoUrl)}
            >
                <img 
                    className='img-item'
                    src={posterUrl}
                    alt="" />
                <img className='play-img' src={playPng} alt="" />    
            </div>
            <PreviewMask
                dataType={activeDataType}
                dataUrl={activeDataUrl}
                onClose={onClose} />
        </>
    )
}