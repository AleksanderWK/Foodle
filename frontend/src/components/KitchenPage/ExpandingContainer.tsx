import React, { useState } from 'react'
import styles from './ExpandingContainer.module.scss'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
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

export const ExpandingContainer: React.FC = () => {
    const [expanded, setExpanded] = useState(false)
    const [feedback, setFeedback] = useState<null | Feedback>()
    const setMealsState = useSetRecoilState(mealsState)
    const user = useRecoilValue(userState)
    const [currentMeal, setCurrentMeal] = useRecoilState(currentMealState)

    const handleMealDataChange = (property: string, value: string) => {
        if (property == 'name') {
            setCurrentMeal((prevState) => ({ ...prevState, [property]: value }))
        }
    }

    const saveMeal = async () => {
        if (user) {
            const newMeal = await createMeal({
                owner: user._id,
                mealName: currentMeal.name,
                groceryIds: currentMeal.groceries.map((grocery) => grocery._id),
            })
            console.log(newMeal)
            setMealsState((prevState) => prevState.concat([newMeal]))
            setCurrentMeal({
                name: '',
                groceries: [],
            })
            setFeedback({
                type: FeedbackTypes.SUCCESS,
                message: 'Matrett opprettet!',
            })
        }
    }

    const resetMeal = () => {
        setCurrentMeal({ name: '', groceries: [] })
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
                    value={currentMeal.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleMealDataChange('name', e.target.value)
                    }}
                    placeholder={'Ny matrett...'}
                />

                <div className={styles.title}>
                    Ingredienser
                    <Icon icon="mdi:food-drumstick-outline" />
                </div>
                <div className={styles.groceriesList}>
                    {currentMeal.groceries.length > 0 ? (
                        currentMeal.groceries.map((grocery) => (
                            <MealListItem key={grocery._id} grocery={grocery} />
                        ))
                    ) : (
                        <div className={styles.noGroceries}>
                            Du har ingen ingredienser enda! Bruk søk for å legge
                            til noen.
                            <SearchOutlined className={styles.searchIcon} />
                        </div>
                    )}
                    {feedback && (
                        <Feedback
                            type={FeedbackTypes.SUCCESS}
                            message={'Matrett lagt til!'}
                        />
                    )}
                </div>
                <Button
                    onClick={() => saveMeal()}
                    type={'Primary'}
                    className={styles.saveButton}
                >
                    Lagre
                </Button>
                <Button
                    onClick={() => resetMeal()}
                    type={'Secondary'}
                    className={styles.resetButton}
                >
                    Nullstill
                </Button>
            </div>

            <PlusOutlined
                className={classNames(styles.icon, expanded && styles.expanded)}
                onClick={() => {
                    expanded && setExpanded(false)
                    setFeedback(null)
                }}
            />
        </div>
    )
}
