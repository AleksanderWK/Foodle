import styles from './Card.module.scss'
import { ReactNode } from 'react'
import classNames from 'classnames'

interface Props {
    children?: ReactNode
    className?: string
}
export const Card: React.FC<Props> = ({ children, className }: Props) => {
    return <div className={classNames(styles.card, className)}>{children}</div>
}
