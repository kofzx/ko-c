import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { FakeNews, FakeNewsProps } from './fakeNews'

export default {
    title: 'components/FakeNews',
    component: FakeNews
} as Meta

const Template: Story<FakeNewsProps> = (args) => <FakeNews {...args} />

const list = [
    { avatarUrl: '', content: 'lalala在3分钟前下了一单' }, 
    { avatarUrl: '', content: 'wu~~~在7分钟前下了一单' }, 
    { avatarUrl: '', content: 'lulu在1分钟前下了一单' },
    { avatarUrl: '', content: 'nuno在15分钟前下了一单' },
    { avatarUrl: '', content: 'prpr在6分钟前下了一单' },
    { avatarUrl: '', content: 'yephh在9分钟前下了一单' }
]

export const Normal = Template.bind({})
Normal.args = {
    list,
    fields: {
        avatar: 'avatarUrl',
        content: 'content'
    }
}