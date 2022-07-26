import { Icon } from '@iconify/react'
import { Button } from '../common/Button'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Card } from '../common/Card'
import styles from './MealTimeline.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import {
    consumptionsState,
    dailyConsumptionsState,
} from '../../state/consumption'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getLastThirtyDaysConsumption } from '../../api/consumptions'
import { userState } from '../../state/user'
import { Consumption, Grocery } from '../../api/types'
import { Meal } from '../../state/kitchen'
import { ExpandingContainer } from '../KitchenPage/ExpandingContainer'

interface MealIndicatorProps {
    name: string
    time: string
    contents: string | undefined
    state: TimelineState
}

const MealIndicator = ({ name, time, contents, state }: MealIndicatorProps) => {
    return (
        <div>
            <div
                className={classNames(
                    styles.line,
                    state != TimelineState.SUBSEQUENT && styles.solid
                )}
            ></div>
            <div className={styles.meal}>
                <div
                    className={classNames(
                        styles.circle,
                        state == TimelineState.CURRENT && styles.current,
                        state == TimelineState.COMPLETED && styles.completed,
                        state == TimelineState.SUBSEQUENT && styles.subsequent
                    )}
                >
                    {state == TimelineState.CURRENT && (
                        <div className={styles.innercircle}></div>
                    )}
                </div>
                <div
                    className={classNames(
                        styles.information,
                        state == TimelineState.CURRENT && styles.current,
                        state == TimelineState.COMPLETED && styles.completed,
                        state == TimelineState.SUBSEQUENT && styles.subsequent
                    )}
                >
                    <div className={styles.nameAndTime}>
                        <span>{name}</span>
                        <span>{time}</span>
                    </div>
                    <span className={styles.contents}>{contents}</span>
                </div>
            </div>
        </div>
    )
}

enum TimelineState {
    COMPLETED,
    CURRENT,
    SUBSEQUENT,
}

export const MealTimeline: React.FC = () => {
    const user = useRecoilValue(userState)
    const [consumptions, setConsumptions] = useRecoilState(consumptionsState)
    const todaysConsumptions = useRecoilValue(dailyConsumptionsState)
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        if (user) {
            getLastThirtyDaysConsumption(user._id).then((consumptions) =>
                setConsumptions(consumptions)
            )
        }
    }, [])

    const resolveMealState = (consumptionDate: Date): TimelineState => {
        const date = new Date(consumptionDate)
        const now = new Date()
        if (date.getHours() == now.getHours()) {
            return TimelineState.CURRENT
        } else if (date.getHours() > now.getHours()) {
            return TimelineState.SUBSEQUENT
        } else {
            return TimelineState.COMPLETED
        }
    }

    const formatMealContent = (
        groceries?: Grocery[],
        meals?: Meal[]
    ): string => {
        let content = []

        if (groceries != undefined) {
            content.push(groceries.map((grocery) => grocery.Matvare))
        }
        if (meals != undefined) {
            content.push(meals.map((meal) => meal.name))
        }
        return content.join(', ')
    }

    const getTime = (meal: Consumption): string => {
        const t = new Date(meal.consumptionDate)
        return t.getHours().toString() + ':' + t.getMinutes().toString()
    }

    return (
        <Card className={styles.mealTimeline}>
            <div className={styles.header}>
                {'Dagens måltider'}
                <Icon icon="iwwa:option" className={styles.icon} />
            </div>
            <div className={styles.timeline}>
                {todaysConsumptions.map((meal: Consumption) => (
                    <MealIndicator
                        name={meal.name}
                        time={getTime(meal)}
                        contents={formatMealContent(meal.groceries, meal.meals)}
                        state={resolveMealState(meal.consumptionDate)}
                    />
                ))}
                <div>
                    <div className={styles.line}></div>
                    <div className={styles.newMeal}>
                        <ExpandingContainer
                            expanded={expanded}
                            setExpanded={setExpanded}
                        >
                            <div></div>
                        </ExpandingContainer>
                        {todaysConsumptions.length == 0 && (
                            <div
                                className={classNames(
                                    styles.noContentText,
                                    styles.information
                                )}
                            >
                                Klikk på “+” for å opprette ett måltid!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}
