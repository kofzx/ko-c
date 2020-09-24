import React, { FC } from 'react'

import closePng from '../assets/close.png'

export type DataType = 'image' | 'video'

export interface PreviewMaskProps {
    /** 预览的文件类型: 图片或视频 */
    dataType?: DataType;
    /** 文件的地址 */
    dataUrl?: string;
    /** 关闭遮罩事件 */
    onClose?: () => void;
}

interface ISize {
    width?: string | number;
    height?: string | number;
}

type ImageElement = HTMLImageElement | null

function getImageRealSize(dataUrl: string) {
    let obj: ISize = {}
    let image: ImageElement = new Image()
    image.src = dataUrl
    obj.width = image.naturalWidth
    obj.height = image.naturalHeight
    image = null

    return obj
}
function normalizeSize(imageSize: any) {
    let obj: ISize = {}
    if (imageSize.width * 2 > window.innerWidth) {
        obj.width = '100%'
        obj.height = 'auto'
    } else {
        obj.width = (imageSize.width * 2) + 'px'
        obj.height = (imageSize.height * 2) + 'px'
    }
    return obj
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
export const PreviewMask: FC<PreviewMaskProps> = (props) => {
    const {
        dataType,
        dataUrl,
        onClose
    } = props

    let contentEl = null

    if (dataUrl) {
        if (dataType === 'image') {
            const imageSize = dataUrl && getImageRealSize(dataUrl)
            const _normalizeSize = normalizeSize(imageSize)
    
            contentEl = (
                <div
                    className='preview-img'
                    style={{
                        backgroundImage: `url(${dataUrl})`,
                        backgroundSize: `${_normalizeSize.width} ${_normalizeSize.height}`
                    }}>
    
                </div>
            )
        } else if (dataType === 'video') {
            contentEl = (
                <video
                    className='preview-video'
                    src={dataUrl}
                    controls
                    preload='auto'
                    playsInline
                    autoPlay
                    muted>
    
                </video>
            )
        }
    }

    return (
        <>
            { dataUrl &&
                <div
                    className='preview-img-mask'
                    onClick={onClose}
                >
                    <img className='preview-close' src={closePng} alt="" />
                    {contentEl}
                </div>
            }
        </>
    )
}

PreviewMask.defaultProps = {
    dataType: 'image'
}