import { atom, selector } from 'recoil'
import { Consumption } from '../api/types'
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

export const dailyConsumptionsGramsState = selector<MacroGrams>({
    key: 'dailyConsumtionsGrams',
    get: ({ get }) => {
        const dailyConsumptions = get(dailyConsumptionsState)
        return {} as MacroGrams
    },
})
