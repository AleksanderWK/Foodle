import { useRecoilState } from 'recoil'
import { Grocery } from '../../api/types'
import { shoppingListState } from '../../state/shoppinglist'
import { Card } from '../common/Card'
import styles from './ShoppingList.module.scss'
import { CloseOutlined } from '@ant-design/icons'
import { Button } from '../common/Button'
import { manageShoppingList } from '../../api/main'
import { Checkbox } from '../common/Checkbox'

interface Props {
    grocery: Grocery
    onRemove: (id: string) => void
}

const ShoppingListItem = ({ grocery, onRemove }: Props) => {
    return (
        <tr className={styles.listItem}>
            <td>{grocery.Matvare}</td>
            <td>1</td>
            <td>
                <Checkbox />
            </td>
            <Button
                onClick={() => onRemove(grocery._id)}
                className={styles.button}
                type={'Secondary'}
            >
                <CloseOutlined className={styles.icon} />
            </Button>
        </tr>
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

    const addToKjoleskap = (groceryId: string) => {
        if (shoppingList) {
            // Delete from shoppinglist
            manageShoppingList('delete', groceryId, shoppingList._id).then(
                (shl) => setShoppingList(shl)
            )

            // Add to kjøleskap
            console.log('Added to kjøleskap')
        }
    }

    const columns = ['Beskrivelse', 'Antall', 'Kjøpt']

    return (
        <Card className={styles.card}>
            <div className={styles.title}>Din handleliste</div>
            {shoppingList && shoppingList.groceries.length > 0 ? (
                <div className={styles.content}>
                    <table className={styles.table}>
                        <tr>
                            {columns.map((text) => (
                                <th>{text}</th>
                            ))}
                        </tr>
                        {shoppingList &&
                            shoppingList.groceries.map((grocery) => (
                                <ShoppingListItem
                                    onRemove={removeFromList}
                                    key={grocery.Matvare}
                                    grocery={grocery}
                                />
                            ))}
                    </table>
                </div>
            ) : (
                <div className={styles.noContent}>
                    {'Du har ingen produkter på handlelisten din!'}
                </div>
            )}
        </Card>
    )
}
