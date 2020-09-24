import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { NormalPreviewMask } from '../../storyComponents/NormalPreviewMask'

export default {
    title: 'components/PreviewMask',
    component: NormalPreviewMask
} as Meta

const Template: Story = (args) => <NormalPreviewMask {...args} />

export const Normal = Template.bind({})