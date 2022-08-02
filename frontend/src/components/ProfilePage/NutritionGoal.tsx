import styles from './NutritionGoal.module.scss'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Input } from '../common/Input'
import { Goal, GoalData } from '../../api/types'
import { userState } from '../../state/user'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from '../common/Button'
import { Slider } from '../common/Slider'
import { addGoal, getGoal } from '../../api/goals'
import { goalState } from '../../state/goal'
import { globalFeedbackState } from '../../state/main'
import { FeedbackTypes } from '../common/Feedback'
import { CircleDiagram } from '../common/CircleDiagram'

export const NutritionGoal = () => {
    const [creatGoalVisible, setCreateGoalVisible] = useState(false)
    const user = useRecoilValue(userState)
    const [createGoal, setCreateGoal] = useState<GoalData>({
        owner: user ? user._id : '',
        calories: 0,
        protein: '33',
        fat: '33',
        carbohydrates: '33',
    })
    const [goal, setGoal] = useRecoilState(goalState)
    const setGlobalFeedback = useSetRecoilState(globalFeedbackState)
    const macros = ['protein', 'fat', 'carbohydrates']

    useEffect(() => {
        if (user) {
            getGoal(user._id).then((goal) => {
                setGoal(goal)
                setCreateGoal(goal)
            })
        }
    }, [])

    const handleGoalChange = (property: string, value: string) => {
        setCreateGoal((prevState) => ({ ...prevState, [property]: value }))
    }

    const propertyToChangeMap = {
        protein: ['fat', 'carbohydrates'],
        fat: ['protein', 'carbohydrates'],
        carbohydrates: ['protein', 'fat'],
    }

    const handleMacrosChange = (
        property: 'protein' | 'fat' | 'carbohydrates',
        value: number
    ) => {
        let totalMacros: number = 0
        if (property == 'protein') {
            totalMacros =
                value +
                parseInt(createGoal.fat) +
                parseInt(createGoal.carbohydrates)
        } else if (property == 'carbohydrates') {
            totalMacros =
                value + parseInt(createGoal.protein) + parseInt(createGoal.fat)
        } else if (property == 'fat') {
            totalMacros =
                value +
                parseInt(createGoal.protein) +
                parseInt(createGoal.carbohydrates)
        }
        if (totalMacros > 100) {
            let prevDenominator = 2
            propertyToChangeMap[property].forEach((macro) => {
                const newValue = Math.floor(
                    parseInt(
                        createGoal[macro as 'protein' | 'fat' | 'carbohydrates']
                    ) -
                        (totalMacros - 100) / prevDenominator
                )
                prevDenominator = newValue < 0 ? 1 : 2
                handleGoalChange(
                    macro,
                    newValue < 0 ? '0' : newValue.toString()
                )
            })
        } else if (totalMacros < 100) {
            let remainder = 100 - totalMacros
            propertyToChangeMap[property].forEach((macro) =>
                handleGoalChange(
                    macro,
                    Math.floor(
                        parseInt(
                            createGoal[
                                macro as 'protein' | 'fat' | 'carbohydrates'
                            ]
                        ) +
                            remainder / 2
                    ).toString()
                )
            )
        }
        handleGoalChange(property, value.toString())
    }

    const saveGoalConfig = () => {
        addGoal(createGoal).then((goal) => {
            if (goal != null) {
                setGoal(goal)
                setGlobalFeedback({
                    type: FeedbackTypes.SUCCESS,
                    message: 'Mål oppdatert!',
                })
            } else {
                setGlobalFeedback({
                    type: FeedbackTypes.ERROR,
                    message: 'Det skjedde en feil ved oppdatering av målet',
                })
            }
            setCreateGoalVisible(false)
            setTimeout(() => setGlobalFeedback(null), 5000)
        })
    }

    return (
        <div
            className={styles.nutritionGoalWrapper}
            style={{
                transform: `translateY( ${creatGoalVisible ? '-50%' : '0%'})`,
            }}
        >
            <div className={styles.nutritionGoal}>
                <div className={styles.cardHeader}>
                    <div>Dagsmål 1. august</div>
                    <div>
                        <Icon
                            icon="iwwa:option"
                            className={styles.optionsIcon}
                            onClick={() => setCreateGoalVisible(true)}
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    {goal != null && (
                        <>
                            <CircleDiagram
                                maxValue={goal.calories}
                                currentValue={2000}
                            />

                            <div className={styles.lineChartsContainer}></div>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.createNutritionGoal}>
                <div className={styles.cardHeader}>
                    <div>Konfigurer dagsmål</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.leftContent}>
                        <Input
                            value={createGoal.calories}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleGoalChange('calories', e.target.value)}
                            type={'number'}
                            placeholder={'kcal'}
                        />
                        <Button onClick={() => saveGoalConfig()} type={'Save'}>
                            Lagre
                        </Button>
                    </div>
                    <div className={styles.rightContent}>
                        {macros.map((macro) => (
                            <div className={styles.sliderContainer} key={macro}>
                                <div className={styles.sliderHeader}>
                                    <div>
                                        {macro.charAt(0).toUpperCase() +
                                            macro.slice(1)}
                                    </div>
                                    <div>
                                        {createGoal[
                                            macro as
                                                | 'protein'
                                                | 'fat'
                                                | 'carbohydrates'
                                        ] + '%'}
                                    </div>
                                </div>
                                <Slider
                                    max={100}
                                    min={0}
                                    value={parseInt(
                                        createGoal[
                                            macro as
                                                | 'protein'
                                                | 'fat'
                                                | 'carbohydrates'
                                        ]
                                    )}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleMacrosChange(
                                            macro as
                                                | 'protein'
                                                | 'fat'
                                                | 'carbohydrates',
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
