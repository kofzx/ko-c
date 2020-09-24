import React, { FC, useState, MouseEvent } from 'react'
import classNames from 'classnames'
import { Toast } from 'antd-mobile'
import { getVideoPosterUrl } from '../_util/common'

import cameraPng from '../assets/camera.png'
import addSvg from '../assets/add.svg'
import playPng from '../assets/play.png'
import switchPng from '../assets/switch.png'

export interface UploadPickerProps {
    /** 一行排列多少个项目 */
    length?: number;
    /** 上传文件数组 */
    files?: any[];
    /** 是否支持多选上传 */
    multiple?: boolean;
    /** 文件上传控件中媒体拍摄的方式，详见[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input) */
    capture?: any;
    /** 是否可以选择上传，默认是 */
    selectable?: boolean;
    /** 点击项目触发的事件 */
    onItemClick?: (index?: number, files?: any) => void;
    /** 项目数量发生变化时触发的事件 */
    onChange?: (files: any[], operationType: string, index?: number) => void;
    /** 上传失败事件 */
    onFail?: (msg: string) => void;
}

function noop() {}

const prefixCls = 'upload-picker'
const ACCEPT_IMAGE = 'image/*'
const ACCEPT_VIDEO = 'video/*'
const ACCEPT_BOTH = 'video/* image/*'

let fileSelectorInput: HTMLInputElement | null

const getOrientation = (file: any, callback: (_: number) => void) => {
    const reader = new FileReader()
    reader.onload = e => {
        const view = new DataView((e.target as any).result)
        if (view.getUint16(0, false) !== 0xffd8) {
            return callback(-2)
        }
        const length = view.byteLength
        let offset = 2
        while (offset < length) {
            const marker = view.getUint16(offset, false)
            offset += 2
            if (marker === 0xffe1) {
                const tmp = view.getUint32((offset += 2), false)
                if (tmp !== 0x45786966) {
                    return callback(-1)
                }
                const little = view.getUint16((offset += 6), false) === 0x4949
                offset += view.getUint32(offset + 4, little)
                const tags = view.getUint16(offset, little)
                offset += 2
                for (let i = 0; i < tags; i++) {
                    if (view.getUint16(offset + i * 12, little) === 0x0112) {
                        return callback(view.getUint16(offset + i * 12 + 8, little))
                    }
                }
            } else if ((marker & 0xff00) !== 0xff00) {
                break
            } else {
                offset += view.getUint16(offset, false)
            }
        }
        return callback(-1)
    };
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024))
}
const getRotation = (orientation = 1) => {
    let imgRotation = 0
    switch (orientation) {
        case 3:
            imgRotation = 180
            break
        case 6:
            imgRotation = 90
            break
        case 8:
            imgRotation = 270
            break
        default:
    }
    return imgRotation
}

/**
 * 上传picker组件，支持上传图片/视频
 * 
 * ###引用
 * 
 * ~~~js
 * import { UploadPicker } from 'ko-c'
 * ~~~
 */
export const UploadPicker: FC<UploadPickerProps> = (props) => {
    const {
        length,
        files = [],
        multiple,
        capture,
        selectable,
        onItemClick,
        onChange,
        onFail
    } = props
    const [ accept, setAccept ] = useState(ACCEPT_BOTH)

    const onSwitchType = (e: MouseEvent) => {
        e.stopPropagation()

        let _accept
        switch (accept) {
            case ACCEPT_IMAGE:
                _accept = ACCEPT_VIDEO
                break
            case ACCEPT_VIDEO:
                _accept = ACCEPT_BOTH
                break
            case ACCEPT_BOTH:
                _accept = ACCEPT_IMAGE
                break
            default:
                _accept = ACCEPT_IMAGE
        }

        setAccept(_accept)
    }
    const removeItem = (index: number) => {
        const newItems: any[] = []
        
        files.forEach((file: any, idx: number) => {
            if (index !== idx) {
                newItems.push(file)
            }
        })

        onChange && onChange(newItems, 'remove', index)
    }
    const addItem = (items: any) => {
        const newItems = files.concat(items)
        onChange && onChange(newItems, 'add')
    }
    const onInnerItemClick = (index: number) => {
        onItemClick && onItemClick(index, files)
    }
    const onFileChange = () => {
        const fileSelectorEl = fileSelectorInput
        if (fileSelectorEl && fileSelectorEl.files && fileSelectorEl.files.length) {
            const files = fileSelectorEl.files

            const itemParsePromiseList = []
            for (let i = 0; i < files.length; i++) {
                let fileSize = files[i].size / 1024
                if (fileSize > 1024 * 10) {
                    Toast.info('上传文件过大', 1)
                    break
                }
                itemParsePromiseList.push(parseFile(files[i], i))
            }
            Promise.all(itemParsePromiseList)
                .then(items => addItem(items))
                .catch(
                    error => {
                        onFail && onFail(error)
                    }
                )
        }
        if (fileSelectorEl) {
            fileSelectorEl.value = ''
        }
    }
    const parseFile = (file: any, index: number) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = async e => {
                const dataURL = (e.target as any).result
                if (!dataURL) {
                    reject(`Fail to get the ${index} image`)
                    return
                }

                let posterUrl = dataURL
                // 视频处理
                // 截取视频第一帧作为封面
                if (file.type.indexOf("video") > -1) {
                    posterUrl = await getVideoPosterUrl(dataURL)
                }

                let orientation = 1
                getOrientation(file, res => {
                    if (res > 0) {
                        orientation = res
                    }
                    resolve({
                        url: dataURL,       // 传给后台的url参数
                        posterUrl,          // 前端展示用的url参数
                        orientation,
                        file
                    })
                })
            }
            reader.readAsDataURL(file)
        })
    }

    const itemList: any[] = []
    let count = parseInt('' + length, 10)
    if (count <= 0) {
        count = 4
    }

    files.forEach((file, index) => {
        const imgStyle = {
            backgroundImage: `url("${file.posterUrl}")`,
            transform: `rotate(${getRotation(file.orientation)}deg)`,
        }

        itemList.push(
            <div key={`file-${index}`} className={`${prefixCls}-flexbox-item`}>
                <div className={`${prefixCls}-item`}>
                    <div
                        className={`${prefixCls}-item-remove`}
                        onClick={() => {
                            removeItem(index)
                        }}>

                    </div>
                    <div
                        className={`${prefixCls}-item-content`}
                        style={imgStyle}
                        onClick={() => {
                            onInnerItemClick(index)
                        }}>
                        {
                            (file.url.indexOf("video") > -1) && (
                                <img className={`${prefixCls}-play-btn`} src={playPng} alt="" />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    })

    const selectEl = (
        <div key='select' className={`${prefixCls}-flexbox-item`}>
            <div className={`${prefixCls}-item ${prefixCls}-upload-btn`}>
                <img
                    className={classNames(
                        'arc-img',
                        {
                            'arc-img--4': length === 4,
                            'arc-img--5': length === 5,
                        }
                    )}
                    src={switchPng}
                    alt=""
                    onClick={onSwitchType}/>
                <input
                    ref={ (input) => { if (input) { fileSelectorInput = input } } }
                    type='file'
                    accept={accept}
                    multiple={multiple}
                    capture={capture}
                    onChange={() => {
                        onFileChange()
                    }} />
                <img src={ (accept === ACCEPT_BOTH) ? addSvg : cameraPng } alt="" />
                {
                    (accept === ACCEPT_IMAGE) && <p>拍照</p>
                }
                {
                    (accept === ACCEPT_VIDEO) && <p>录像</p>
                }
                {
                    (accept === ACCEPT_BOTH) && <p>选择文件</p>
                }
            </div>
        </div>
    );

    let allEl = selectable ? itemList.concat([selectEl]) : itemList
    const len = allEl.length
    // flex布局需要补全数目才能显示预期样子
    // 以下为补充空白项目的代码
    if (len !== 0 && len % count !== 0) {
        const blankCount = count - len % count
        const fillBlankEl = []
        for (let i = 0; i < blankCount; i++) {
            fillBlankEl.push(
                <div key={`blank-${i}`} className={`${prefixCls}-flexbox-item`}>

                </div>
            )
        }
        allEl = allEl.concat(fillBlankEl)
    }

    const flexEl = []
    // 每行排布item的规则
    for (let i = 0; i < allEl.length / count; i++) {
        const rowEl = allEl.slice(i * count, i * count + count)
        flexEl.push(rowEl)
    }
    const renderEl = flexEl.map((item, index) => (
        <div key={`flex-${index}`} className={`${prefixCls}-flexbox`}>
            {item}
        </div>
    ));

    return (
        <div className={`${prefixCls}`}>
            {renderEl}
        </div>
    )
}

UploadPicker.defaultProps = {
    files: [],
    length: 4,
    multiple: false,
    capture: false,
    selectable: true,
    onItemClick: noop,
    onChange: noop,
    onFail: noop,
}