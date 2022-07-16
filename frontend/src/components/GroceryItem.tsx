import { useState } from 'react'
import { Grocery } from '../api/types'
import { Button } from './common/Button'
import styles from './GroceryItem.module.scss'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { shoppingListState } from '../state/shoppinglist'
import { useRecoilState } from 'recoil'
import { manageShoppingList } from '../api/main'

interface Props {
    grocery: Grocery
}

export const GroceryItem: React.FC<Props> = ({ grocery }: Props) => {
    const [isAdded, setIsAdded] = useState(false)
    const [shoppingList, setShoppingList] = useRecoilState(shoppingListState)

    const onGroceryClick = () => {
        if (shoppingList) {
            if (!isAdded) {
                manageShoppingList('add', grocery._id, shoppingList._id).then(
                    (shl) => setShoppingList(shl)
                )
            } else {
                manageShoppingList(
                    'delete',
                    grocery._id,
                    shoppingList._id
                ).then((shl) => setShoppingList(shl))
            }
            setIsAdded((prevState) => !prevState)
        }
    }

    return (
        <div
            className={classNames(
                styles.groceryContainer,
                isAdded && styles.selected
            )}
            onClick={onGroceryClick}
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
