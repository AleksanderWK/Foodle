import React, { ChangeEvent, useState } from 'react'
import styles from './ExpandingContainer.module.scss'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { Input } from '../common/Input'
import { Button } from '../common/Button'
import { useRecoilValue } from 'recoil'

interface Props {}

export const ExpandingContainer: React.FC<Props> = () => {
    const [expanded, setExpanded] = useState(false)

    const [mealData, setMealData] = useState({
        name: '',
        groceries: [],
    })

    const handleMealDataChange = (property: string, value: string) => {
        if (property == 'name') {
            setMealData((prevState) => ({ ...prevState, [property]: value }))
        }
    }

    return (
        <div
            className={classNames(
                styles.container,
                expanded && styles.expanded
            )}
            onClick={() => {
                !expanded && setExpanded(true)
            }}
        >
            <div
                className={classNames(
                    styles.content,
                    !expanded && styles.hidden
                )}
            >
                <Input
                    value={mealData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleMealDataChange('name', e.target.value)
                    }}
                    placeholder={'Ny matrett...'}
                />

                <div className={styles.title}>Ingredienser</div>
                <div className={styles.groceriesList}>
                    <div className={styles.noGroceries}>
                        Du har ingen ingredienser enda! Bruk søk for å legge til
                        noen.
                        <SearchOutlined className={styles.searchIcon} />
                    </div>
                </div>
            </div>

            <PlusOutlined
                className={classNames(styles.icon, expanded && styles.expanded)}
                onClick={() => {
                    expanded && setExpanded(false)
                }}
            />
        </div>
    )
}
