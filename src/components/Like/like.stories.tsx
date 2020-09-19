import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { Like, LikeProps } from './like'

export default {
    title: 'components/Like',
    component: Like
} as Meta

const Template: Story<LikeProps> = (args) => <Like {...args} />

export const Normal = Template.bind({})
Normal.args = {
    isLikeOn: false
}