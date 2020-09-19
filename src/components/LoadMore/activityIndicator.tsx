import React, { FC } from 'react'
import classNames from 'classnames'
import { AtLoading } from './loading'

export interface AtActivityIndicatorProps {
    size?: number;
    mode?: string;
    color?: string;
    content?: string;
    className?: string;
}

export const AtActivityIndicator: FC<AtActivityIndicatorProps> = (props) => {
    const {
        size,
        mode,
        color,
        content,
        className
    } = props
    const rootClass = classNames(
        'at-activity-indicator',
        {
            'at-activity-indicator--center': mode === 'center'
        },
        className
    )
    return (
        <div className={rootClass}>
            <div className='at-activity-indicator__body'>
                <AtLoading size={size} color={color} />
            </div>
            {content && (
                <div className='at-activity-indicator__content'>{content}</div>
            )}
        </div>
    )
}

AtActivityIndicator.defaultProps = {
    size: 0,
    mode: '',
    color: '',
    content: '',
    className: '',
}