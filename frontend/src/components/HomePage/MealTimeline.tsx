import { Icon } from '@iconify/react'
import { Button } from '../common/Button'
import classNames from 'classnames'
import { useState } from 'react'
import { Card } from '../common/Card'
import styles from './MealTimeline.module.scss'
import { PlusOutlined } from '@ant-design/icons'

interface Meal {
    name: string
    time: string
    contents: string
    state: TimelineState
}

const MealIndicator = ({ name, time, contents, state }: Meal) => {
    return (
        <div>
            <div className={styles.line}></div>
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
    const [meals, setMeals] = useState([
        {
            name: 'Frokost',
            time: '08.00',
            contents: 'Egg, Røkt kalkunfilet, Brød',
            state: TimelineState.COMPLETED,
        },
        {
            name: 'Lunsj',
            time: '12.00',
            contents: 'Makrell i tomat, Brød',
            state: TimelineState.CURRENT,
        },
    ])

    return (
        <Card className={styles.mealTimeline}>
            <div className={styles.header}>
                {'Dagens måltider'}
                <Icon icon="iwwa:option" className={styles.icon} />
            </div>
            <div className={styles.timeline}>
                {meals.map((meal) => (
                    <MealIndicator
                        name={meal.name}
                        time={meal.time}
                        contents={meal.contents}
                        state={meal.state}
                    />
                ))}
                <div>
                    <div className={styles.line}></div>
                    <div className={styles.newMeal}>
                        <Button
                            onClick={() => {}}
                            type={'Primary'}
                            className={styles.createButton}
                        >
                            <PlusOutlined className={styles.addIcon} />
                        </Button>
                        {meals.length == 0 && (
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
