import { useState } from 'react'
import { Grocery } from '../api/types'
import { Button } from './common/Button'
import styles from './GroceryItem.module.scss'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import classNames from 'classnames'

interface Props {
    grocery: Grocery
}

export const GroceryItem: React.FC<Props> = ({ grocery }: Props) => {
    const [isAdded, setIsAdded] = useState(false)

    const onGroceryAdd = () => {
        if (!isAdded) {
            console.log('la til')
        } else {
            console.log('tok vekk')
        }
        setIsAdded((prevState) => !prevState)
    }

    return (
        <div
            className={classNames(
                styles.groceryContainer,
                isAdded && styles.selected
            )}
            onClick={onGroceryAdd}
        >
            {grocery.Matvare}
            <Button
                onClick={() => {}}
                type={'Secondary'}
                className={styles.button}
            >
                {!isAdded ? (
                    <PlusOutlined className={styles.icon} />
                ) : (
                    <MinusOutlined className={styles.icon} />
                )}
            </Button>
        </div>
    )
}
