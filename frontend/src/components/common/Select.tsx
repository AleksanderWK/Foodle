import styles from './Select.module.scss'
import {
    CaretDownFilled,
    CaretUpFilled,
    CloseOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import classNames from 'classnames'

interface Props {
    options: string[]
    onOptionSelected: (option: string | null) => void
    addLocation: string | null
}

export const Select: React.FC<Props> = ({
    options,
    onOptionSelected,
    addLocation,
}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div
            className={classNames(
                styles.selectContainer,
                !addLocation ? isOpen && styles.open : null,
                addLocation ? styles.selected : styles.unselected
            )}
        >
            <div
                className={classNames(styles.select)}
                onClick={() => {
                    setIsOpen((prevState) => {
                        return !prevState
                    })
                }}
            >
                {addLocation ? (
                    <>
                        {addLocation}
                        <CloseOutlined
                            onClick={() => {
                                onOptionSelected(null)
                            }}
                            className={styles.closeIcon}
                        />
                    </>
                ) : (
                    <>
                        {'Legg til'}
                        {isOpen ? (
                            <CaretUpFilled className={styles.icon} />
                        ) : (
                            <CaretDownFilled className={styles.icon} />
                        )}
                    </>
                )}
            </div>
            {options.map((option) => (
                <div
                    key={option}
                    className={styles.option}
                    onClick={() => onOptionSelected(option)}
                >
                    {option}
                </div>
            ))}
        </div>
    )
}
