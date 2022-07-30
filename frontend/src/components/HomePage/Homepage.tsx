import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
    getUserShoppingListByUser,
    getUserShoppingListByUserId,
} from '../../api/main'
import { shoppingListState } from '../../state/shoppinglist'
import { userState } from '../../state/user'
import { Card } from '../common/Card'
import { SearchField } from '../common/SearchField'
import styles from './Homepage.module.scss'
import { MealTimeline } from './MealTimeline'
import { ShoppingList } from './ShoppingList'

interface Props {}
export const Homepage: React.FC<Props> = () => {
    const [shoppingList, setShoppingList] = useRecoilState(shoppingListState)
    const user = useRecoilValue(userState)

    useEffect(() => {
        if (user) {
            getUserShoppingListByUserId(user._id).then((shl) =>
                setShoppingList(shl)
            )
        }
    }, [])
    return (
        <div className={styles.homepageContainer}>
            <div className={styles.shoppinglist}>
                <ShoppingList />
            </div>
            <div className={styles.mealTimeline}>
                <MealTimeline />
            </div>
        </div>
    )
}
