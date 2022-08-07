import { useState } from 'react'
import { Grocery } from '../api/types'
import styles from './GroceryItem.module.scss'
import classNames from 'classnames'
import { shoppingListState } from '../state/shoppinglist'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { manageShoppingList } from '../api/main'
import { Icon } from '@iconify/react'
import { useLocation } from 'react-router-dom'
import { currentMealState } from '../state/kitchen'
import { manageFavoriteList } from '../api/favorite'
import { userState } from '../state/user'
import { favoritelistState } from '../state/favoritelist'

interface Props {
    grocery: Grocery
}

export const GroceryItem: React.FC<Props> = ({ grocery }: Props) => {
    const [isShoppingListAdded, setIsAdded] = useState(false)
    const [isMealAdded, setIsMealAdded] = useState(false)
    const [shoppingList, setShoppingList] = useRecoilState(shoppingListState)
    const location = useLocation()
    const [currentMeal, setCurrentMeal] = useRecoilState(currentMealState)
    const user = useRecoilValue(userState)
    const [favoriteList, setFavoriteList] = useRecoilState(favoritelistState)
    const [isFavorited, setIsFavoried] = useState(
        favoriteList.groceries.indexOf(grocery._id) == -1 ? false : true
    )

    const onShoppingListClick = () => {
        if (shoppingList) {
            if (!isShoppingListAdded) {
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

    const onManageCurrentMeal = (action: 'add' | 'delete') => {
        if (action == 'add') {
            setCurrentMeal((prevState) => ({
                ...prevState,
                groceries: prevState.groceries.concat([grocery]),
            }))
        } else if (action == 'delete') {
            setCurrentMeal((prevState) => ({
                ...prevState,
                groceries: prevState.groceries.filter(
                    (g) =>
                        prevState.groceries.indexOf(grocery) !=
                        prevState.groceries.indexOf(g)
                ),
            }))
        }
        setIsMealAdded((prevState) => !prevState)
    }

    const handleGroceryFavorite = () => {
        if (user) {
            if (!isFavorited) {
                manageFavoriteList('add', user.favoritelist, grocery._id).then(
                    (favoritelist) => setFavoriteList(favoritelist)
                )
            } else {
                manageFavoriteList(
                    'delete',
                    user.favoritelist,
                    grocery._id
                ).then((favoritelist) => setFavoriteList(favoritelist))
            }
            setIsFavoried((prevState) => !prevState)
        }
    }

    return (
        <div className={classNames(styles.groceryContainer)}>
            {grocery.Matvare}
            <div className={styles.optionsGroup}>
                {isFavorited ? (
                    <Icon
                        icon="ant-design:heart-filled"
                        className={styles.icon}
                        onClick={() => handleGroceryFavorite()}
                    />
                ) : (
                    <Icon
                        icon="ant-design:heart-outlined"
                        className={styles.icon}
                        onClick={() => handleGroceryFavorite()}
                    />
                )}

                {location.pathname == '/Kjokken' &&
                    (!isMealAdded ? (
                        <Icon
                            onClick={() => onManageCurrentMeal('add')}
                            icon="ant-design:plus-outlined"
                            className={styles.icon}
                        />
                    ) : (
                        <Icon
                            onClick={() => onManageCurrentMeal('delete')}
                            icon="ant-design:minus-outlined"
                            className={styles.icon}
                        />
                    ))}
                {location.pathname == '/Hjem' &&
                    (!isShoppingListAdded ? (
                        <Icon
                            onClick={onShoppingListClick}
                            icon="carbon:shopping-cart-plus"
                            className={styles.icon}
                        />
                    ) : (
                        <Icon
                            onClick={onShoppingListClick}
                            icon="carbon:shopping-cart-minus"
                            className={styles.icon}
                        />
                    ))}
            </div>
        </div>
    )
}
