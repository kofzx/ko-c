import React, { FC, useState } from 'react'
import { UploadPicker } from '../components/UploadPicker/uploadPicker'

export interface NormalUploadPickerProps {
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

/**
 * 上传picker组件
 * 
 * ###引用
 * 
 * ~~~js
 * import { UploadPicker } from 'ko-c'
 * ~~~
 */
export const NormalUploadPicker: FC<NormalUploadPickerProps> = () => {
    const [ files, setFiles ] = useState([])
    const onChange = (files: any) => {
        setFiles(files)
    }

    return (
        <UploadPicker
            files={files}
            multiple
            capture
            length={4}
            selectable={files.length < 7}
            onChange={onChange} />
    )
}