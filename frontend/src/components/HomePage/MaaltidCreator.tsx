import classNames from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import { Card } from '../common/Card'
import styles from './MaaltidCreator.module.scss'
import {
    CloseOutlined,
    SearchOutlined,
    CheckOutlined,
    PlusOutlined,
    MinusOutlined,
} from '@ant-design/icons'
import { Input } from '../common/Input'
import { Button } from '../common/Button'
import { Consumption, Grocery } from '../../api/types'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '../../state/user'
import { Meal } from '../../api/types'
import { ListItem } from '../common/ListItem'
import { consumptionsState } from '../../state/consumption'
import { globalFeedbackState } from '../../state/main'
import { FeedbackTypes } from '../common/Feedback'
import useFetch, { PATH } from '../../utils/hooks/useFetch'

interface Props {
    visible: boolean
    onSetVisible: (visible: boolean) => void
}

interface multiSearchResult {
    groceries: Grocery[] | null
    meals: Meal[] | null
}

export const MaaltidCreator = ({ visible, onSetVisible }: Props) => {
    const [searchShowing, setSearchShowing] = useState(false)
    const user = useRecoilValue(userState)
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResult, setSearchResult] = useState<multiSearchResult>({
        groceries: [],
        meals: [],
    })
    const [consumption, setConsumption] = useState<Consumption>({
        name: '',
        owner: user ? user?._id : '',
        groceries: [],
        meals: [],
        consumptionDate: new Date(),
    })
    const setConsumptions = useSetRecoilState(consumptionsState)
    const setGlobalFeedback = useSetRecoilState(globalFeedbackState)
    const fetch = useFetch()

    const handleMaaltidContents = (
        type: 'groceries' | 'meals',
        value: Grocery | Meal,
        action: 'remove' | 'add'
    ) => {
        const updatedList = consumption[type]
        if (action == 'add') {
            updatedList.push(value as Grocery & Meal)
        }
        if (action == 'remove') {
            updatedList.splice(updatedList.indexOf(value as Grocery & Meal), 1)
        }
        setConsumption((prevState) => ({ ...prevState, [type]: updatedList }))
    }

    const search = async (value: string) => {
        setSearchValue(value)
        if (value.length > 0) {
            const searchObject = {
                query: value,
            }
            fetch
                .post(PATH.concat('/groceries/search'), searchObject)
                .then((res) =>
                    setSearchResult((prevState) => ({
                        ...prevState,
                        groceries: res,
                    }))
                )

            fetch.post(PATH.concat('/meals/search'), searchObject).then((res) =>
                setSearchResult((prevState) => ({
                    ...prevState,
                    meals: res,
                }))
            )
        }
        if (value == '') {
            setSearchResult({
                groceries: [],
                meals: [],
            })
        }
    }

    const resetState = () => {
        setConsumption({
            name: '',
            owner: user ? user?._id : '',
            groceries: [],
            meals: [],
            consumptionDate: new Date(),
        })
    }

    const saveMaaltid = async () => {
        fetch.post(PATH.concat('/consumptions/add'), consumption).then(
            (newConsumptions) => {
                setConsumptions(newConsumptions)
                resetState()
                onSetVisible(false)
                setGlobalFeedback({
                    type: FeedbackTypes.SUCCESS,
                    message: 'Måltid lagt til!',
                })
            },
            () => {
                setGlobalFeedback({
                    type: FeedbackTypes.ERROR,
                    message: 'Det skjedde en feil!',
                })
            }
        )
        setTimeout(() => setGlobalFeedback(null), 5000)
    }

    const groceryOptions = (grocery: Grocery) => {
        return consumption.groceries
            .map((grocery) => grocery._id)
            .includes(grocery._id) ? (
            <MinusOutlined
                className={styles.actionIcon}
                onClick={() =>
                    handleMaaltidContents('groceries', grocery, 'remove')
                }
            />
        ) : (
            <PlusOutlined
                className={styles.actionIcon}
                onClick={() =>
                    handleMaaltidContents('groceries', grocery, 'add')
                }
            />
        )
    }

    const mealOptions = (meal: Meal) => {
        return consumption.meals.map((meal) => meal._id).includes(meal._id) ? (
            <MinusOutlined
                className={styles.actionIcon}
                onClick={() => handleMaaltidContents('meals', meal, 'remove')}
            />
        ) : (
            <PlusOutlined
                className={styles.actionIcon}
                onClick={() => handleMaaltidContents('meals', meal, 'add')}
            />
        )
    }

    return (
        <Card
            className={classNames(
                styles.addMealContainer,
                visible && styles.visible
            )}
        >
            <div
                className={styles.addMealWrapper}
                style={{
                    transform: `translateX( ${searchShowing ? '-50%' : '0%'})`,
                }}
            >
                <div className={styles.addMaaltidInfo}>
                    <div className={styles.header}>
                        {'Legg til måltid'}
                        <CloseOutlined
                            className={styles.closeIcon}
                            onClick={() => onSetVisible(false)}
                        />
                    </div>
                    <Input
                        value={consumption.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setConsumption((prevState) => ({
                                ...prevState,
                                ['name']: e.target.value,
                            }))
                        }
                        placeholder={'Navn på måltid...'}
                    />
                    <div className={styles.timeGroup}>
                        <div> Tidspunkt:</div>{' '}
                        <input
                            type={'time'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                let maaltidTime = new Date()
                                maaltidTime.setHours(
                                    parseInt(e.target.value.split(':')[0]),
                                    parseInt(e.target.value.split(':')[1]),
                                    0,
                                    0
                                )
                                setConsumption((prevState) => ({
                                    ...prevState,
                                    ['consumptionDate']: maaltidTime,
                                }))
                            }}
                        />
                    </div>

                    <div className={styles.maaltidContentsWrapper}>
                        <div className={styles.maaltidContentsHeader}>
                            Innhold:
                        </div>
                        {consumption.groceries.length > 0 ||
                        consumption.meals.length > 0 ? (
                            <div className={styles.maaltidContents}>
                                <div>
                                    {consumption.groceries.map((grocery) => (
                                        <ListItem
                                            title={grocery.Matvare}
                                            ListOptions={
                                                <MinusOutlined
                                                    className={
                                                        styles.actionIcon
                                                    }
                                                    onClick={() =>
                                                        handleMaaltidContents(
                                                            'groceries',
                                                            grocery,
                                                            'remove'
                                                        )
                                                    }
                                                />
                                            }
                                        />
                                    ))}
                                    {consumption.meals.map((meal) => (
                                        <ListItem
                                            title={meal.mealName}
                                            ListOptions={
                                                <MinusOutlined
                                                    className={
                                                        styles.actionIcon
                                                    }
                                                    onClick={() =>
                                                        handleMaaltidContents(
                                                            'meals',
                                                            meal,
                                                            'remove'
                                                        )
                                                    }
                                                />
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.noContents}>
                                <div className={styles.information}>
                                    Du har ikke innhold i måltidet ditt enda!
                                    Trykk på søk for å legge til noe.
                                    <SearchOutlined
                                        className={styles.showSearchIcon}
                                        onClick={() => setSearchShowing(true)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button onClick={() => saveMaaltid()} type={'Save'}>
                            Lagre
                        </Button>
                        <Button onClick={() => resetState()} type={'Delete'}>
                            Nullstill
                        </Button>
                    </div>
                </div>
                <div className={styles.searchMaaltidContents}>
                    <span className={styles.checkInput}>
                        <Input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                search(e.target.value)
                            }}
                            placeholder={
                                'Søk på produkter og matretter til måltidet...'
                            }
                            className={styles.searchBar}
                            value={searchValue}
                        />
                        <CheckOutlined
                            className={styles.check}
                            onClick={() => {
                                setSearchShowing(false)
                                setSearchValue('')
                                setSearchResult({
                                    groceries: [],
                                    meals: [],
                                })
                            }}
                        />
                    </span>
                    <div className={styles.searchResultContainer}>
                        {searchResult != null ? (
                            <>
                                {searchResult.groceries &&
                                    searchResult.groceries.length > 0 && (
                                        <div>
                                            <div
                                                className={
                                                    styles.categoryHeader
                                                }
                                            >
                                                Produkter
                                            </div>
                                            {searchResult?.groceries?.map(
                                                (grocery) => (
                                                    <ListItem
                                                        key={grocery._id}
                                                        title={grocery.Matvare}
                                                        ListOptions={groceryOptions(
                                                            grocery
                                                        )}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}
                                {searchResult.meals &&
                                    searchResult.meals.length > 0 && (
                                        <div>
                                            <div
                                                className={
                                                    styles.categoryHeader
                                                }
                                            >
                                                Matretter
                                            </div>
                                            {searchResult?.meals?.map(
                                                (meal) => (
                                                    <ListItem
                                                        key={meal._id}
                                                        title={meal.mealName}
                                                        ListOptions={mealOptions(
                                                            meal
                                                        )}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}
                            </>
                        ) : (
                            <div className={styles.information}>
                                Ingen resultater
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}
