import { useRecoilState } from 'recoil'
import { Grocery } from '../../api/types'
import { shoppingListState } from '../../state/shoppinglist'
import { Card } from '../common/Card'
import styles from './ShoppingList.module.scss'
import { CloseOutlined } from '@ant-design/icons'
import { Button } from '../common/Button'
import { manageShoppingList } from '../../api/main'

interface Props {
    grocery: Grocery
    onRemove: (id: string) => void
}

const ShoppingListItem = ({ grocery, onRemove }: Props) => {
    return (
        <div className={styles.listItem}>
            {grocery.Matvare}
            <div className={styles.actionsGroup}>
                <Button
                    onClick={() => onRemove(grocery._id)}
                    className={styles.button}
                    type={'Secondary'}
                >
                    <CloseOutlined className={styles.icon} />
                </Button>
            </div>
        </div>
    )
}

export const ShoppingList: React.FC = () => {
    const [shoppingList, setShoppingList] = useRecoilState(shoppingListState)

    const removeFromList = (groceryId: string) => {
        if (shoppingList)
            manageShoppingList('delete', groceryId, shoppingList._id).then(
                (shl) => setShoppingList(shl)
            )
    }

    return (
        <Card>
            <div className={styles.title}>Din handleliste</div>
            {shoppingList &&
                shoppingList.groceries.map((grocery) => (
                    <ShoppingListItem
                        onRemove={removeFromList}
                        key={grocery.Matvare}
                        grocery={grocery}
                    />
                ))}
        </Card>
    )
}
