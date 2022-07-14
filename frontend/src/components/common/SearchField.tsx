import classNames from 'classnames'
import React, { useState } from 'react'
import { Button } from './Button'
import styles from './SearchField.module.scss'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { searchGroceries } from '../../api/main'
import { Grocery } from '../../api/types'
import { GroceryItem } from '../GroceryItem'

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

    const search = async () => {
        if (searchValue.length > 0) {
            const searchObject = {
                query: searchValue,
            }
            const searchResult = await searchGroceries(searchObject)
            console.log(searchResult)
            setSearchResult(searchResult)
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
                    ? { height: '400px' }
                    : { height: '55px' }
            }
        >
            <span className={classNames(styles.inputWrapper, className)}>
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
            {searchResult?.map((grocery: Grocery) => (
                <GroceryItem key={grocery.Matvare} grocery={grocery} />
            ))}
        </div>
    )
}
