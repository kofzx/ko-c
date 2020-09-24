import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { NormalUploadPicker, NormalUploadPickerProps } from '../../storyComponents/NormalUploadPicker'

export default {
    title: 'components/UploadPicker',
    component: NormalUploadPicker,
    decorators:  [(Story) => 
        <div style={{ background: '#ffffff' }}>
            <p 
                style={{
                    fontSize: '14px',
                    color: '#666666',
                    marginBottom: '12px'
                }}
            >
                建议使用移动模式/设备打开此页。
            </p>
            <Story/>
        </div>
    ]
} as Meta

const Template: Story<NormalUploadPickerProps> = (args) => <NormalUploadPicker {...args} />

export const Normal = Template.bind({})