import styles from './ConsumptionHistory.module.scss'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState } from 'react'

export const ConsumptionHistory: React.FC = () => {
    const [chartOptions] = useState<Highcharts.Options>({
        chart: {},
        plotOptions: {
            series: {
                // general options for all series
            },
            area: {
                // shared options for all area series
            },
        },
        series: [
            {
                // specific options for this series instance
                type: 'area',
            },
        ],
        xAxis: {},
        yAxis: {},
        tooltip: {},
    })

    return (
        <div className={styles.consumptionHistoryContainer}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    )
}
