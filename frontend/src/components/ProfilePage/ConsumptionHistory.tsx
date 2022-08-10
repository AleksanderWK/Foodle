import styles from './ConsumptionHistory.module.scss'
import {
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    ResponsiveContainer,
    TooltipProps,
} from 'recharts'
import {
    ValueType,
    NameType,
} from 'recharts/src/component/DefaultTooltipContent'
import { useRecoilValue } from 'recoil'
import { lastThirtyDaysMacrosState } from '../../state/consumption'
import { monthNamesNor } from '../../utils/dateUtils'

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        const formattedLable = (label: string) => {
            const labelParts = label.split('.')
            if (parseInt(labelParts[0]) <= 9) {
                labelParts[0] = labelParts[0][1]
            }
            return (
                labelParts[0] +
                '. ' +
                monthNamesNor[parseInt(labelParts[1]) - 1]
            )
        }

        return (
            <div className={styles.tooltip}>
                <div className={styles.tooltipHeader}>
                    {formattedLable(label)}
                </div>
                {[0, 1, 2].map((index) => (
                    <div className={styles.tooltipEntry}>
                        <div>{payload[index].name}:</div>
                        <div>{payload[index].value}g</div>
                    </div>
                ))}
            </div>
        )
    }

    return null
}

export interface ChartMacrosData {
    date: any
    protein: number
    fat: number
    carbohydrates: number
}

export enum Macros {
    PROTEIN = 'protein',
    FAT = 'fat',
    CARBOHYDRATES = 'carbohydrates',
}

export const ConsumptionHistory: React.FC = () => {
    const lastThirtyDaysConsumptionMacros = useRecoilValue(
        lastThirtyDaysMacrosState
    )

    const formatter = (value: string) => `${value}g`

    return (
        <ResponsiveContainer width={'100%'} height={'85%'}>
            <AreaChart data={lastThirtyDaysConsumptionMacros}>
                <defs>
                    {Object.values(Macros).map((macro) => (
                        <linearGradient id={macro} x1="0" y1="0" x2="0" y2="2">
                            <stop
                                className={styles.color}
                                offset="5%"
                                stopOpacity={0.8}
                            />
                            <stop
                                className={styles.color}
                                offset="95%"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    ))}
                </defs>
                <XAxis dataKey="date" padding={{ left: 10, right: 10 }} />
                <YAxis
                    tickFormatter={formatter}
                    padding={{ top: 10, bottom: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                {Object.values(Macros).map((macro) => (
                    <Area
                        className={styles.area}
                        type="monotone"
                        stroke={'hsl(163, 91%, 39%)'}
                        dataKey={macro}
                        fill={`url(#${macro})`}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    )
}
