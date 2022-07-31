import styles from './NutritionGoal.module.scss'
import { useState } from 'react'
import { Icon } from '@iconify/react'

export const NutritionGoal = () => {
    const [creatGoalVisible, setCreateGoalVisible] = useState(false)

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
            </div>
            <div className={styles.createNutritionGoal}>
                <div className={styles.cardHeader}>
                    <div>Opprett dagsmål</div>
                    <div>
                        <Icon
                            icon="iwwa:option"
                            className={styles.optionsIcon}
                            onClick={() => setCreateGoalVisible(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
