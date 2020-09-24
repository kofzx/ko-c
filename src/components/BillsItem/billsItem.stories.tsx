import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { BillsItem, BillsItemProps } from './billsItem'
import { ThreeLineLayout } from './threeLineLayout'
import { TwoLineLayout } from './twoLineLayout'
import { PriceFeatureBox } from './priceFeatureBox'

import '../../storyComponents/billsItem.scss'
import stepperPng from '../../images/stepper.png'

export default {
    title: 'components/BillsItem',
    component: BillsItem,
    subcomponents: {ThreeLineLayout, TwoLineLayout, PriceFeatureBox},
    decorators:  [(Story) => 
        <div style={{ background: '#ffffff' }}>
            <p 
                style={{
                    fontSize: '14px',
                    color: '#666666',
                    marginBottom: '20px'
                }}
            >
                建议使用移动模式/设备打开此页。
            </p>
            <Story/>
        </div>
    ]
} as Meta

const imageUrl = 'https://img13.360buyimg.com/n1/jfs/t1/70575/17/10596/54553/5d7f0c87E97f45331/ffac4a95fb8176bd.jpg'

const Template: Story<BillsItemProps> = (args) => <BillsItem {...args} />

export const ThreeLineLayoutWithoutChildren = Template.bind({})
ThreeLineLayoutWithoutChildren.args = {
    imageUrl,
    children: <ThreeLineLayout
                goodsName='宝宝金油'
                goodsPrice={299} 
                renderContent={() => (
                    <p className='bills-item-option-tag'>
                        s码;白色
                    </p>
                )} />
}

export const ThreeLineLayoutWithStepper = Template.bind({})
ThreeLineLayoutWithStepper.args = {
    imageUrl,
    children: <ThreeLineLayout
                goodsName='宝宝金油'
                goodsPrice={299} 
                renderContent={() => (
                    <p className='bills-item-option-tag'>
                        s码;白色
                    </p>
                )}>
                    <img src={stepperPng} alt="" style={{ width: '100px', height: '30px' }} />
               </ThreeLineLayout>
}

export const ThreeLineLayoutWithCount = Template.bind({})
ThreeLineLayoutWithCount.args = {
    imageUrl,
    children: <ThreeLineLayout
                goodsName='宝宝金油'
                goodsPrice={299} 
                renderContent={() => (
                    <p className='bills-item-option-tag'>
                        s码;白色
                    </p>
                )}>
                    <p className='bills-item-count'>x2</p>
               </ThreeLineLayout>
}

export const TwoLineLayoutWithPrice = Template.bind({})
TwoLineLayoutWithPrice.args = {
    className: 'two-line-bills-item',
    imageUrl,
    children: (<>
        <TwoLineLayout
            goodsName='宝宝金油' 
            renderContent={() => (
                <PriceFeatureBox goodsPrice={299}  />
            )} />
        <p className='bills-item-count abs-count'>x1</p>
    </>)
}

export const TwoLineLayoutWithDescribtion = Template.bind({})
TwoLineLayoutWithDescribtion.args = {
    className: 'two-line-bills-item',
    imageUrl,
    children: (<>
        <TwoLineLayout
            goodsName='宝宝金油' 
            renderContent={() => (
                <p className='bills-item-describtion'>宝宝金油就是宝宝金油</p>
            )} />
        <p className='bills-item-count abs-count'>x1</p>
    </>)
}