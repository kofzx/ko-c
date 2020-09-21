import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { NormalUploadPicker, NormalUploadPickerProps } from '../../storyComponents/NormalUploadPicker'

export default {
    title: 'components/UploadPicker',
    component: NormalUploadPicker
} as Meta

const Template: Story<NormalUploadPickerProps> = (args) => <NormalUploadPicker {...args} />

export const Normal = Template.bind({})