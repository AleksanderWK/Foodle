import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './Button.module.scss'

interface Props {
    className?: string
    onClick: () => void
    children?: ReactNode
    type: 'Primary' | 'Secondary'
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
                type == 'Secondary' && styles.secondary,
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
