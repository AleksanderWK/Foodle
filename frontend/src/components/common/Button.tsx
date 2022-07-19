import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './Button.module.scss'

interface Props {
    className?: string
    onClick: () => void
    children?: ReactNode
    type: 'Primary' | 'Secondary' | 'Save' | 'Delete'
}

export const Button: React.FunctionComponent<Props> = ({
    className,
    onClick,
    children,
    type,
}: Props) => {
    return (
        <button
            className={classNames(
                styles.button,
                type == 'Primary' && styles.primary,
                type == 'Secondary' && styles.secondary,
                type == 'Save' && styles.save,
                type == 'Delete' && styles.delete,
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
