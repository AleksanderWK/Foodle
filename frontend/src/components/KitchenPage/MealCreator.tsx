import { ExpandingContainer } from './ExpandingContainer'
import styles from './MealCreator.module.scss'
import React, { ReactNode, useRef, useState } from 'react'
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    CheckOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'
import { Input } from '../common/Input'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from '../common/Button'
import { createMeal } from '../../api/kitchen'
import { currentMealState, mealsState } from '../../state/kitchen'
import { Icon } from '@iconify/react'
import { userState } from '../../state/user'
import { Grocery } from '../../api/types'
import { CaretDownFilled } from '@ant-design/icons'
import { Feedback, FeedbackTypes } from '../common/Feedback'
import { searchGroceries } from '../../api/main'
import { GroceryItem } from '../GroceryItem'
import { globalFeedbackState } from '../../state/main'

interface Props {
    grocery: Grocery
}

const MealListItem = ({ grocery }: Props) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className={styles.listItem}>
            <div className={styles.header}>
                {grocery.Matvare}
                <CaretDownFilled
                    className={classNames(
                        styles.moreInfoIcon,
                        expanded && styles.expanded
                    )}
                    onClick={() => setExpanded((prevState) => !prevState)}
                />
            </div>

            <div
                className={classNames(
                    styles.nutritionsGroup,
                    expanded && styles.expanded
                )}
            >
                {'Næringsinnhold (per 100g):'}
                <ul>
                    <li>Protein: {grocery.Protein}</li>
                    <li> Fett: {grocery.Fett}</li>
                    <li>Karbohydrater: {grocery.Karbohydrat}</li>
                </ul>
            </div>
        </div>
    )
}

export const MealCreator: React.FC = () => {
    const [expanded, setExpanded] = useState(false)
    const [feedback, setGlobalFeedback] = useRecoilState(globalFeedbackState)
    const setMealsState = useSetRecoilState(mealsState)
    const user = useRecoilValue(userState)
    const [currentMeal, setCurrentMeal] = useRecoilState(currentMealState)
    const [nameInputShowing, setNameInputShowing] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResult, setSearchResult] = useState<Grocery[] | null>(null)

    const handleMealDataChange = (property: string, value: string) => {
        if (property == 'name') {
            setCurrentMeal((prevState) => ({ ...prevState, [property]: value }))
        }
    }

    const search = async (value: string) => {
        setSearchValue(value)
        if (value.length > 0) {
            const searchObject = {
                query: value,
            }
            const searchResult = await searchGroceries(searchObject)
            setSearchResult(searchResult)
        }
        if (value == '') {
            setSearchResult(null)
        }
    }

    const saveMeal = async () => {
        if (user) {
            const newMeal = await createMeal({
                owner: user._id,
                mealName: currentMeal.name,
                groceryIds: currentMeal.groceries.map((grocery) => grocery._id),
            })
            setMealsState((prevState) => prevState.concat([newMeal]))
            setCurrentMeal({
                name: '',
                groceries: [],
            })
            setGlobalFeedback({
                type: FeedbackTypes.SUCCESS,
                message: 'Matrett opprettet!',
            })
            setTimeout(() => {
                setGlobalFeedback(null)
            }, 5000)
        }
    }

    const resetMeal = () => {
        setCurrentMeal({ name: '', groceries: [] })
    }

    return (
        <ExpandingContainer expanded={expanded} setExpanded={setExpanded}>
            {showSearch ? (
                <div
                    className={classNames(
                        styles.content,
                        styles.searchContent,
                        !expanded && styles.hidden
                    )}
                >
                    <span className={styles.checkInput}>
                        <Input
                            value={searchValue}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                search(e.target.value)
                            }}
                            placeholder={'Søk på produkter...'}
                            className={styles.searchBar}
                        />
                        <CheckOutlined
                            className={styles.check}
                            onClick={() => {
                                setShowSearch(false)
                                setSearchValue('')
                                setSearchResult(null)
                            }}
                        />
                    </span>

                    <div className={styles.searchResultContainer}>
                        {searchResult?.map((grocery) => (
                            <GroceryItem grocery={grocery} />
                        ))}
                        <div className={styles.information}>
                            {searchResult && searchResult.length > 0
                                ? 'Ingen flere resultater'
                                : 'Ingen resultater'}
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={classNames(
                        styles.content,
                        !expanded && styles.hidden
                    )}
                >
                    <div className={styles.header}>
                        {nameInputShowing ? (
                            <span className={styles.checkInput}>
                                <Input
                                    value={currentMeal.name}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleMealDataChange(
                                            'name',
                                            e.target.value
                                        )
                                    }}
                                    placeholder={'Ny matrett...'}
                                />
                                <CheckOutlined
                                    className={styles.check}
                                    onClick={() => setNameInputShowing(false)}
                                />
                            </span>
                        ) : (
                            <>
                                <div
                                    className={classNames(
                                        styles.editName,
                                        currentMeal.name != '' && styles.hasName
                                    )}
                                >
                                    {currentMeal.name != '' && currentMeal.name}
                                    <EditOutlined
                                        className={styles.headerIcon}
                                        onClick={() =>
                                            setNameInputShowing(true)
                                        }
                                    />
                                </div>
                                <SearchOutlined
                                    className={styles.headerIcon}
                                    onClick={() => setShowSearch(true)}
                                />
                            </>
                        )}
                    </div>
                    <div className={styles.title}>Ingredienser</div>
                    <div className={styles.groceriesList}>
                        {currentMeal.groceries.length > 0 ? (
                            currentMeal.groceries.map((grocery) => (
                                <MealListItem
                                    key={grocery._id}
                                    grocery={grocery}
                                />
                            ))
                        ) : (
                            <div className={styles.noGroceries}>
                                Du har ingen ingredienser enda! Bruk søk for å
                                legge til noen.
                            </div>
                        )}
                    </div>
                    <div
                        className={classNames(
                            styles.buttonGroup,
                            expanded && styles.visible
                        )}
                    >
                        <Button
                            onClick={() => saveMeal()}
                            type={'Save'}
                            className={styles.saveButton}
                        >
                            Lagre
                        </Button>
                        <Button
                            onClick={() => resetMeal()}
                            type={'Delete'}
                            className={styles.resetButton}
                        >
                            Nullstill
                        </Button>
                    </div>
                </div>
            )}
        </ExpandingContainer>
    )
}
