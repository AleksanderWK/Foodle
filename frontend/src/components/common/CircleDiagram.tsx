import styles from './CircleDiagram.module.scss'

interface Props {
    maxValue: number
    currentValue: number
}

export const CircleDiagram: React.FC<Props> = ({
    maxValue,
    currentValue,
}: Props) => {
    return (
        <svg viewBox="0 0 36 36">
            <path
                d={
                    'M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831'
                }
                className={styles.circle}
                strokeDasharray={`${(currentValue / maxValue) * 100}, 100`}
            />
            <text x="18" y="17.5" className={styles.percentage}>
                <tspan x="18">
                    {currentValue}/{maxValue}
                </tspan>
                <tspan x="18" dy={'3.5px'}>
                    kcal
                </tspan>
            </text>
        </svg>
    )
}
