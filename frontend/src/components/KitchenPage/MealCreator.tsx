import { ExpandingContainer } from './ExpandingContainer'
import styles from './MealCreator.module.scss'
import React, { useState } from 'react'
import { SearchOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { Input } from '../common/Input'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from '../common/Button'
import { currentMealState, mealsState } from '../../state/kitchen'
import { Icon } from '@iconify/react'
import { userState } from '../../state/user'
import { Grocery } from '../../api/types'
import { CaretDownFilled } from '@ant-design/icons'
import { FeedbackTypes } from '../common/Feedback'
import { GroceryItem } from '../GroceryItem'
import { globalFeedbackState } from '../../state/main'
import useFetch, { PATH } from '../../utils/hooks/useFetch'

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
    const setGlobalFeedback = useSetRecoilState(globalFeedbackState)
    const setMealsState = useSetRecoilState(mealsState)
    const user = useRecoilValue(userState)
    const [currentMeal, setCurrentMeal] = useRecoilState(currentMealState)
    const [nameInputShowing, setNameInputShowing] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResult, setSearchResult] = useState<Grocery[] | null>(null)
    const fetch = useFetch()

    const handleMealDataChange = (property: string, value: string) => {
        if (property == 'mealName') {
            setCurrentMeal((prevState) => ({ ...prevState, [property]: value }))
        }
    }

    const search = async (value: string) => {
        setSearchValue(value)
        if (value.length > 0) {
            const searchObject = {
                query: value,
            }
            fetch
                .post(PATH.concat('/groceries/search'), searchObject)
                .then((res) => setSearchResult(res))
        }
        if (value == '') {
            setSearchResult(null)
        }
    }

    const saveMeal = async () => {
        if (user) {
            fetch
                .post(PATH.concat('/meals/create'), {
                    owner: user._id,
                    mealName: currentMeal.mealName,
                    groceryIds: currentMeal.groceries.map(
                        (grocery) => grocery._id
                    ),
                })
                .then((newMeal) =>
                    setMealsState((prevState) => prevState.concat([newMeal]))
                )
            resetMeal()
            setGlobalFeedback({
                type: FeedbackTypes.SUCCESS,
                message: 'Matrett opprettet!',
            })
            setTimeout(() => {
                setGlobalFeedback(null)
            }, 5000)
        }
    }

    const onManageCurrentMeal = (
        action: 'add' | 'delete',
        grocery: Grocery
    ) => {
        if (action == 'add') {
            setCurrentMeal((prevState) => ({
                ...prevState,
                groceries: prevState.groceries.concat([grocery]),
            }))
        } else if (action == 'delete') {
            setCurrentMeal((prevState) => ({
                ...prevState,
                groceries: prevState.groceries.filter(
                    (g) => grocery._id != g._id
                ),
            }))
        }
    }

    const resetMeal = () => {
        setCurrentMeal({
            _id: '',
            owner: '',
            mealName: '',
            groceries: [],
            dateCreated: new Date(),
        })
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
                            <GroceryItem grocery={grocery}>
                                {currentMeal.groceries
                                    .map((grocery) => grocery._id)
                                    .indexOf(grocery._id) == -1 ? (
                                    <Icon
                                        onClick={() =>
                                            onManageCurrentMeal('add', grocery)
                                        }
                                        icon="ant-design:plus-outlined"
                                        className={styles.icon}
                                    />
                                ) : (
                                    <Icon
                                        onClick={() =>
                                            onManageCurrentMeal(
                                                'delete',
                                                grocery
                                            )
                                        }
                                        icon="ant-design:minus-outlined"
                                        className={styles.icon}
                                    />
                                )}
                            </GroceryItem>
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
                                    value={currentMeal.mealName}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleMealDataChange(
                                            'mealName',
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
                                        currentMeal.mealName != '' &&
                                            styles.hasName
                                    )}
                                >
                                    {currentMeal.mealName != '' &&
                                        currentMeal.mealName}
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
