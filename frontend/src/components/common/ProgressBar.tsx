import styles from './ProgressBar.module.scss'

interface Props {
    currentValue: number
    maxValue: number
}

export const ProgressBar: React.FC<Props> = ({
    currentValue,
    maxValue,
}: Props) => {
    const width =
        currentValue > maxValue ? 100 : (currentValue / maxValue) * 100
    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
                <div
                    className={styles.progress}
                    style={{
                        width: `${width}%`,
                    }}
                ></div>
            </div>
        </div>
    )
}
