import React, { ReactNode } from 'react'
import styles from './ExpandingContainer.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import classNames from 'classnames'

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
