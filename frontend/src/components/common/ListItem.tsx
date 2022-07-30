import React, { ReactNode } from 'react'
import styles from './ListItem.module.scss'

interface Props {
    title: string
    ListOptions: ReactNode
}

export const ListItem: React.FC<Props> = ({ title, ListOptions }: Props) => {
    return (
        <div className={styles.searchResultContainer}>
            <div className={styles.titleContainer}>{title}</div>
            <div className={styles.resultOptionsContainer}>{ListOptions}</div>
        </div>
    )
}
