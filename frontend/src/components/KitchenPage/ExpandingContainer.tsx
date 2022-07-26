import React, { ReactNode, useRef, useState } from 'react'
import styles from './ExpandingContainer.module.scss'
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    CheckOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'
import { Input } from '../common/Input'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from '../common/Button'
import { createMeal } from '../../api/kitchen'
import { currentMealState, mealsState } from '../../state/kitchen'
import { Icon } from '@iconify/react'
import { userState } from '../../state/user'
import { Grocery } from '../../api/types'
import { CaretDownFilled } from '@ant-design/icons'
import { Feedback, FeedbackTypes } from '../common/Feedback'
import { searchGroceries } from '../../api/main'
import { GroceryItem } from '../GroceryItem'

interface ExpandingContainerProps {
    setExpanded: (value: boolean) => void
    expanded: boolean
    children: ReactNode
}

export const ExpandingContainer: React.FC<ExpandingContainerProps> = ({
    expanded,
    children,
    setExpanded,
}: ExpandingContainerProps) => {
    return (
        <div
            className={classNames(
                styles.container,
                expanded && styles.expanded
            )}
            onClick={() => {
                !expanded && setExpanded(true)
            }}
        >
            {children}
            <PlusOutlined
                className={classNames(styles.icon, expanded && styles.expanded)}
                onClick={() => {
                    expanded && setExpanded(false)
                }}
            />
        </div>
    )
}
