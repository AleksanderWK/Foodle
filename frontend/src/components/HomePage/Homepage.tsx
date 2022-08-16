import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { favoritelistState } from '../../state/favoritelist'
import { globalFeedbackState } from '../../state/main'
import { shoppingListState } from '../../state/shoppinglist'
import { userState } from '../../state/user'
import useFetch, { PATH } from '../../utils/hooks/useFetch'
import { FeedbackTypes } from '../common/Feedback'
import styles from './Homepage.module.scss'
import { MealTimeline } from './MealTimeline'
import { ShoppingList } from './ShoppingList'

interface Props {}
export const Homepage: React.FC<Props> = () => {
    const setShoppingList = useSetRecoilState(shoppingListState)
    const setFavoriteList = useSetRecoilState(favoritelistState)
    const setFeedback = useSetRecoilState(globalFeedbackState)
    const user = useRecoilValue(userState)
    const fetch = useFetch()

    useEffect(() => {
        if (user) {
            fetch.get(PATH.concat(`/shoppinglists/${user._id}`)).then(
                (shl) => {
                    setShoppingList(shl)
                },
                () => {
                    setFeedback({
                        type: FeedbackTypes.ERROR,
                        message:
                            'Det skjedde en feil ved henting av handleliste',
                    })
                    setTimeout(() => {
                        setFeedback(null)
                    }, 5000)
                }
            )
            fetch.get(PATH.concat(`/favoritelists/${user._id}`)).then(
                (fl) => setFavoriteList(fl),
                () => {
                    setFeedback({
                        type: FeedbackTypes.ERROR,
                        message:
                            'Det skjedde en feil ved henting av favoritter',
                    })
                    setTimeout(() => {
                        setFeedback(null)
                    }, 5000)
                }
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
