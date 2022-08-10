import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { getFavoriteListByUserId } from '../../api/favorite'
import {
    getUserShoppingListByUser,
    getUserShoppingListByUserId,
} from '../../api/main'
import { favoritelistState } from '../../state/favoritelist'
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
    const setFavoriteList = useSetRecoilState(favoritelistState)
    const user = useRecoilValue(userState)

    useEffect(() => {
        if (user) {
            getUserShoppingListByUserId(user._id).then((shl) =>
                setShoppingList(shl)
            )
            getFavoriteListByUserId(user._id).then((fl) => setFavoriteList(fl))
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
