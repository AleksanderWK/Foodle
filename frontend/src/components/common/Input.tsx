import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './Input.module.scss'

interface Props {
    className?: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    type?: string
    icon?: ReactNode
    error?: boolean
}

export const Input: React.FunctionComponent<Props> = ({
    className,
    value,
    onChange,
    placeholder,
    type,
    icon,
    error,
}: Props) => {
    return (
        <span className={classNames(styles.inputWrapper, className)}>
            {icon && <span className={styles.inputIcon}>{icon}</span>}
            <input
                type={type}
                className={classNames(
                    styles.input,
                    icon && styles.withIcon,
                    error && styles.error
                )}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </span>
    )
}
