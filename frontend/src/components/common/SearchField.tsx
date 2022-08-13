import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Button } from './Button'
import styles from './SearchField.module.scss'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { manageShoppingList, searchGroceries } from '../../api/main'
import { Grocery, SearchObject } from '../../api/types'
import { GroceryItem } from '../GroceryItem'
import { Icon } from '@iconify/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { shoppingListState } from '../../state/shoppinglist'
import { manageFavoriteList } from '../../api/favorite'
import { userState } from '../../state/user'
import { favoritelistState } from '../../state/favoritelist'
import { FilterBar } from './FilterBar'

export enum SearchFilter {
    FAVORITES = 'Favoritter',
    ON_SHOPPINGLIST = 'Handleliste',
}

interface Props {
    className?: string
    placeholder: string
    error?: boolean
}

export const SearchField: React.FC<Props> = ({
    className,
    placeholder,
    error,
}: Props) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResult, setSearchResult] = useState<Grocery[] | null>(null)
    const [shoppingList, setShoppingList] = useRecoilState(shoppingListState)
    const user = useRecoilValue(userState)
    const [favoriteList, setFavoriteList] = useRecoilState(favoritelistState)
    const [currentFilters, setCurrentFilters] = useState<SearchFilter[]>([])

    const search = async () => {
        if (searchValue.length > 0) {
            const searchObject = {
                user_id: user?._id,
                query: searchValue,
                filters: currentFilters,
            }
            console.log(searchObject)
            const searchResult = await searchGroceries(searchObject)
            setSearchResult(searchResult)
        }
    }

    useEffect(() => {
        search()
    }, [currentFilters])

    const onShoppingListClick = (grocery: Grocery) => {
        if (shoppingList) {
            if (
                shoppingList.groceries
                    .map((grocery) => grocery._id)
                    .indexOf(grocery._id) == -1
            ) {
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
        }
    }

    const handleGroceryFavorite = (grocery: Grocery) => {
        if (user) {
            if (favoriteList.groceries.indexOf(grocery._id) == -1) {
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
        }
    }

    const onFilterToggled = (filter: SearchFilter) => {
        const index = currentFilters.indexOf(filter)
        if (index != -1) {
            setCurrentFilters((prevState) =>
                prevState.filter((filter) => prevState.indexOf(filter) != index)
            )
        } else {
            setCurrentFilters((prevState) => prevState.concat(filter))
        }
    }

    return (
        <div
            className={classNames(
                styles.searchContainer,
                searchResult && searchValue && styles.hasResults
            )}
            style={
                searchResult && searchResult.length > 0
                    ? { height: '455px' }
                    : searchResult != null && searchResult.length == 0
                    ? { height: '165px' }
                    : { height: '55px' }
            }
        >
            <span
                className={classNames(
                    styles.inputWrapper,
                    className,
                    searchResult && styles.hasResults
                )}
            >
                <input
                    type={'text'}
                    className={classNames(styles.input, error && styles.error)}
                    value={searchValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value.length < 1) {
                            setSearchResult(null)
                        }
                        setSearchValue(e.target.value)
                    }}
                    placeholder={placeholder}
                />
                {searchValue && (
                    <CloseOutlined
                        onClick={() => {
                            setSearchValue('')
                            setCurrentFilters([])
                            setSearchResult(null)
                        }}
                        className={styles.closeIcon}
                    />
                )}
                <Button
                    className={styles.inputButton}
                    onClick={() => search()}
                    type={'Primary'}
                >
                    <SearchOutlined className={styles.inputButtonIcon} />
                </Button>
            </span>
            {searchResult && (
                <>
                    <FilterBar
                        filters={Object.values(SearchFilter)}
                        onFilterToggle={onFilterToggled}
                        currentFilters={currentFilters}
                    />
                    {searchResult.map((grocery: Grocery) => (
                        <GroceryItem key={grocery.Matvare} grocery={grocery}>
                            <>
                                {favoriteList.groceries.indexOf(grocery._id) !=
                                -1 ? (
                                    <Icon
                                        icon="ant-design:heart-filled"
                                        className={styles.icon}
                                        onClick={() =>
                                            handleGroceryFavorite(grocery)
                                        }
                                    />
                                ) : (
                                    <Icon
                                        icon="ant-design:heart-outlined"
                                        className={styles.icon}
                                        onClick={() =>
                                            handleGroceryFavorite(grocery)
                                        }
                                    />
                                )}
                                {shoppingList?.groceries
                                    .map((grocery) => grocery._id)
                                    .indexOf(grocery._id) == -1 ? (
                                    <Icon
                                        onClick={() =>
                                            onShoppingListClick(grocery)
                                        }
                                        icon="carbon:shopping-cart-plus"
                                        className={styles.icon}
                                    />
                                ) : (
                                    <Icon
                                        onClick={() =>
                                            onShoppingListClick(grocery)
                                        }
                                        icon="carbon:shopping-cart-minus"
                                        className={styles.icon}
                                    />
                                )}
                            </>
                        </GroceryItem>
                    ))}
                    <div className={styles.information}>
                        {searchResult.length > 0
                            ? 'Ingen flere resultater'
                            : 'Ingen resultater'}
                    </div>
                </>
            )}
        </div>
    )
}
