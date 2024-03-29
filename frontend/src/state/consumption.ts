import { atom, selector, selectorFamily } from 'recoil'
import { Consumption, Grocery, Meal } from '../api/types'
import { ChartMacrosData } from '../components/ProfilePage/ConsumptionHistory'
import { getDayMonthFromDate } from '../utils/dateUtils'
import { MacroGrams } from './goal'

export const consumptionsState = atom<Consumption[]>({
    key: 'consumptions',
    default: [],
})

export const dailyConsumptionsState = selector<Consumption[]>({
    key: 'dailyConsumptions',
    get: ({ get }) => {
        const consumptions = get(consumptionsState)
        const today = new Date()
        const dailyConsumptions = consumptions.filter(
            (consumption) =>
                new Date(consumption.consumptionDate).setHours(0, 0, 0, 0) ==
                today.setHours(0, 0, 0, 0)
        )
        dailyConsumptions.sort((a, b) =>
            a.consumptionDate > b.consumptionDate ? 1 : -1
        )
        return dailyConsumptions
    },
})

interface Totals {
    calories: number
    protein: number
    fat: number
    carbohydrates: number
}

const getTotalsFromGroceries = (groceries: Grocery[]) => {
    const totalProtein = groceries
        .map((grocery) => parseInt(grocery.Protein))
        .reduce((prevSum, newValue) => prevSum + newValue, 0)
    const totalFat = groceries
        .map((grocery) => parseInt(grocery.Fett))
        .reduce((prevSum, newValue) => prevSum + newValue, 0)
    const totalCarbohydrates = groceries
        .map((grocery) => parseInt(grocery.Karbohydrat))
        .reduce((prevSum, newValue) => prevSum + newValue, 0)
    const totalCalories = groceries
        .map((grocery) => parseInt(grocery.Kilokalorier))
        .reduce((prevSum, newValue) => prevSum + newValue, 0)
    const totals: Totals = {
        calories: totalCalories,
        protein: totalProtein,
        fat: totalFat,
        carbohydrates: totalCarbohydrates,
    }
    return totals
}

export const dailyConsumptionsTotalState = selector<Totals>({
    key: 'dailyConsumptionsTotal',
    get: ({ get }) => {
        const dailyConsumptions = get(dailyConsumptionsState)
        const totalAllDailyGroceries = getTotalsFromGroceries(
            dailyConsumptions
                .map((consumption) =>
                    consumption.groceries.concat(
                        consumption.meals.map((meal) => meal.groceries).flat()
                    )
                )
                .flat()
        )
        return totalAllDailyGroceries
    },
})

export const lastThirtyDaysMacrosState = selector<ChartMacrosData[]>({
    key: 'lastThirtyDaysMacros',
    get: ({ get }) => {
        const consumptions = get(consumptionsState)

        const consumptionsByDay = consumptions.reduce((obj, consumption) => {
            const dateKey = new Date(consumption.consumptionDate).setHours(
                0,
                0,
                0,
                0
            )
            if (dateKey in obj) {
                obj[dateKey].push(consumption)
            } else {
                obj[dateKey] = [consumption]
            }
            return obj
        }, Object.create({}))

        const lastThirtyDaysMacros = Object.entries(consumptionsByDay).map(
            ([date, day]) => {
                const macros = getTotalsFromGroceries(
                    (day as Consumption[])
                        .map((consumption: Consumption) =>
                            consumption.groceries.concat(
                                consumption.meals
                                    .map((meal) => meal.groceries)
                                    .flat()
                            )
                        )
                        .flat()
                )
                return {
                    date: getDayMonthFromDate(new Date(parseInt(date))),
                    protein: macros.protein,
                    fat: macros.fat,
                    carbohydrates: macros.carbohydrates,
                }
            }
        )
        return lastThirtyDaysMacros
    },
})
