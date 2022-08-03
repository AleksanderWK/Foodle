import classNames from 'classnames'
import React from 'react'
import styles from './Slider.module.scss'

interface Props {
    max: number
    min: number
    value: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
}

export const Slider: React.FC<Props> = ({
    max,
    min,
    value,
    onChange,
    className,
}: Props) => {
    return (
        <input
            className={classNames(styles.slider, className)}
            type={'range'}
            max={max}
            min={min}
            value={value}
            onChange={onChange}
        />
    )
}
