import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Grocery } from '../../api/types'
import { shoppingListState } from '../../state/shoppinglist'
import { Card } from '../common/Card'
import styles from './ShoppingList.module.scss'
import { CloseOutlined, SendOutlined } from '@ant-design/icons'
import { Button } from '../common/Button'
import { Checkbox } from '../common/Checkbox'
import { userState } from '../../state/user'
import { FeedbackTypes } from '../common/Feedback'
import { globalFeedbackState } from '../../state/main'
import { Icon } from '@iconify/react'
import useFetch, { PATH } from '../../utils/hooks/useFetch'
import { useEffect } from 'react'

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
    const setGlobalFeedback = useSetRecoilState(globalFeedbackState)
    const fetch = useFetch()

    const removeFromList = (groceryId: string) => {
        if (shoppingList)
            fetch
                .post(PATH.concat(`/shoppinglists/delete`), {
                    groceryId: groceryId,
                    shoppinglistId: shoppingList._id,
                })
                .then((shl) => setShoppingList(shl))
    }

    const mailShoppingList = async () => {
        if (user) {
            fetch.post(PATH.concat(`/shoppinglists/send`), user).then(
                () => {
                    setGlobalFeedback({
                        message: 'Handleliste sendt! Sjekk eposten din.',
                        type: FeedbackTypes.SUCCESS,
                    })
                },
                () => {
                    setGlobalFeedback({
                        message: 'Det skjedde en feil',
                        type: FeedbackTypes.ERROR,
                    })
                }
            )
            setTimeout(() => {
                setGlobalFeedback(null)
            }, 5000)
        }
    }

    const columns = ['Beskrivelse', 'Kjøpt']

    return (
        <Card className={styles.card}>
            <div className={styles.header}>
                <div className={styles.title}>Din handleliste</div>
                <div className={styles.optionsGroup}>
                    <SendOutlined
                        className={styles.iconButton}
                        onClick={() => mailShoppingList()}
                    />
                    <Icon icon="iwwa:option" className={styles.optionsIcon} />
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
                                    onAddToKjoleskap={() => {}}
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
