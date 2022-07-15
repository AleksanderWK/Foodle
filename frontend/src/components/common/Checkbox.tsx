import classNames from 'classnames'
import styles from './Checkbox.module.scss'
interface Props {
    className?: string
}
export const Checkbox: React.FC<Props> = ({ className }: Props) => {
    return (
        <input
            type="checkbox"
            className={classNames(styles.checkbox, className)}
        />
    )
}
