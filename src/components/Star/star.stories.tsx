import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { Star, StarProps } from './star'

export default {
    title: 'components/Star',
    component: Star
} as Meta

const Template: Story<StarProps> = (args) => <Star {...args} />

export const Normal = Template.bind({})
Normal.args = {
    value: 4,
}

export const Gutter = Template.bind({})
Gutter.args = {
    value: 4,
    margin: 10
}

export const Readonly = Template.bind({})
Readonly.args = {
    value: 4,
    readonly: true
}