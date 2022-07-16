import classNames from 'classnames'
import React from 'react'
import styles from './Checkbox.module.scss'
interface Props {
    className?: string
    onCheck: (checked: boolean) => void
}
export const Checkbox: React.FC<Props> = ({ className, onCheck }: Props) => {
    return (
        <input
            type="checkbox"
            className={classNames(styles.checkbox, className)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onCheck(e.target.checked)
            }}
        />
    )
}
