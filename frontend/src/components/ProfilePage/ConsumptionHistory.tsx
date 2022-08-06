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

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return <div></div>
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

    return (
        <ResponsiveContainer width={'100%'} height={'100%'}>
            <AreaChart
                data={lastThirtyDaysConsumptionMacros}
                margin={{ left: 0 }}
            >
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
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                {Object.values(Macros).map((macro) => (
                    <Area
                        className={styles.area}
                        type="monotone"
                        stroke={'hsl(243, 100%, 69%)'}
                        dataKey={macro}
                        fill={`url(#${macro})`}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    )
}
