import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ScrollTab, ScrollTabProps } from './scrollTab'

export default {
    title: 'components/ScrollTab',
    component: ScrollTab
} as Meta

const Template: Story<ScrollTabProps> = (args) => <ScrollTab {...args} />

const tabs = [
    '水果', '食物', '饮料', '奶茶', '外卖', 
    'KFC', 'M记', '沙县', '黄焖鸡', '重庆小面', 
    '铁板烧', '章鱼大丸子'
]

const tabs2 = [
    { id: 1, category: '水果' }, { id: 2, category: '食物' }, { id: 3, category: '饮料' },
    { id: 4, category: '奶茶' }, { id: 5, category: '外卖' }, { id: 6, category: 'KFC' },
    { id: 7, category: 'M记' }, { id: 8, category: '沙县' }, { id: 9, category: '黄焖鸡' },
    { id: 10, category: '重庆小面' }, { id: 11, category: '铁板烧' }, { id: 12, category: '章鱼大丸子' },
]

export const Normal = Template.bind({})
Normal.args = {
    list: tabs,
}

export const CustomFields = Template.bind({})
CustomFields.args = {
    list: tabs2,
    fields: {
        name: 'category'
    }
}