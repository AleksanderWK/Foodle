import { useRecoilState, useRecoilValue } from 'recoil'
import { Grocery } from '../../api/types'
import { shoppingListState } from '../../state/shoppinglist'
import { Card } from '../common/Card'
import styles from './ShoppingList.module.scss'
import { CloseOutlined, SendOutlined } from '@ant-design/icons'
import { Button } from '../common/Button'
import { manageShoppingList, sendShoppingList } from '../../api/main'
import { Checkbox } from '../common/Checkbox'
import { userState } from '../../state/user'
import { Feedback, FeedbackTypes } from '../common/Feedback'
import { useState } from 'react'

interface Props {
    grocery: Grocery
    onRemove: (id: string) => void
    onAddToKjoleskap: (groceryId: string, checked: boolean) => void
}

const ShoppingListItem = ({ grocery, onRemove, onAddToKjoleskap }: Props) => {
    const addItemToKjoleskap = (checked: boolean) => {
        onAddToKjoleskap(grocery._id, checked)
    }

    return (
        <tr className={styles.listItem}>
            <td>{grocery.Matvare}</td>
            <td>
                <Checkbox onCheck={addItemToKjoleskap} />
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
    const user = useRecoilValue(userState)
    const [feedback, setFeedback] = useState<null | Feedback>()

    const removeFromList = (groceryId: string) => {
        if (shoppingList)
            manageShoppingList('delete', groceryId, shoppingList._id).then(
                (shl) => setShoppingList(shl)
            )
    }

    const mailShoppingList = async () => {
        if (user) {
            const response = await sendShoppingList(user)
            if (response.successful) {
                setFeedback({
                    message: 'Epost sendt! Sjekk eposten din.',
                    type: FeedbackTypes.SUCCESS,
                })
            } else {
                setFeedback({
                    message: 'Det skjedde en feil',
                    type: FeedbackTypes.ERROR,
                })
            }
        }
    }

    const addToKjoleskap = (groceryId: string, checked: boolean) => {
        if (shoppingList && checked) {
            // Delete from shoppinglist
            // manageShoppingList('delete', groceryId, shoppingList._id).then(
            //     (shl) => setShoppingList(shl)
            // )

            // Add to kjøleskap
            console.log('Added to kjøleskap')
        }
    }

    const columns = ['Beskrivelse', 'Kjøpt']

    return (
        <Card className={styles.card}>
            <div className={styles.header}>
                <div className={styles.title}>Din handleliste</div>
                <div className={styles.optionsGrouo}>
                    <SendOutlined
                        className={styles.iconButton}
                        onClick={() => mailShoppingList()}
                    />
                </div>
            </div>

            {shoppingList && shoppingList.groceries.length > 0 ? (
                <div className={styles.content}>
                    <table className={styles.table}>
                        <tr>
                            {columns.map((text) => (
                                <th key={text}>{text}</th>
                            ))}
                        </tr>
                        {shoppingList &&
                            shoppingList.groceries.map((grocery) => (
                                <ShoppingListItem
                                    onAddToKjoleskap={addToKjoleskap}
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
