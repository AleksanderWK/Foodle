import { ReactNode } from 'react'
import { Grocery } from '../api/types'
import styles from './GroceryItem.module.scss'
import classNames from 'classnames'

interface Props {
    grocery: Grocery
    children: ReactNode
}

export const GroceryItem: React.FC<Props> = ({ grocery, children }: Props) => {
    return (
        <div className={classNames(styles.groceryContainer)}>
            {grocery.Matvare}
            <div className={styles.optionsGroup}>{children}</div>
        </div>
    )
}
