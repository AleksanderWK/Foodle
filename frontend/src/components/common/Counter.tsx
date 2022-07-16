import styles from './Counter.module.scss'
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons'
import { useState } from 'react'
import classNames from 'classnames'

interface Props {
    count: number
    setCount: (count: number) => void
}

export const Counter: React.FC<Props> = ({ count, setCount }: Props) => {
    const manageCount = (action: 'up' | 'down') => {
        if (action == 'up') {
            setCount(count + 1)
        } else {
            if (!(count <= 1)) {
                setCount(count - 1)
            }
        }
    }

    return (
        <div className={styles.counterContainer}>
            <CaretLeftFilled
                className={styles.icon}
                onClick={() => manageCount('up')}
            />
            {count}
            <CaretRightFilled
                className={classNames(
                    styles.icon,
                    count <= 1 && styles.disabled
                )}
                onClick={() => manageCount('down')}
            />
        </div>
    )
}
