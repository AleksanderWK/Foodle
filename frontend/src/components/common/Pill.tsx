import classNames from 'classnames'
import { useState } from 'react'
import styles from './Pill.module.scss'

interface Props {
    onClick: () => void
    title: string
    toggled: boolean
}

export const Pill: React.FC<Props> = ({ title, toggled, onClick }: Props) => {
    return (
        <div
            className={classNames(styles.pill, toggled && styles.toggled)}
            onClick={() => onClick()}
        >
            {title}
        </div>
    )
}
