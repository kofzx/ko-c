import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { AtLoadMore, AtLoadMoreProps } from './loadMore'

export default {
    title: 'components/LoadMore',
    component: AtLoadMore
} as Meta

const Template: Story<AtLoadMoreProps> = (args) => <AtLoadMore {...args} />

export const Loading = Template.bind({})
Loading.args = {
    status: 'loading'
}

export const NoMore = Template.bind({})
NoMore.args = {
    status: 'noMore'
}