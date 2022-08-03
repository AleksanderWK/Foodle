import { atom, selector } from 'recoil'
import { Goal } from '../api/types'

export const goalState = atom<Goal | null>({
    key: 'goal',
    default: null,
})

export interface MacroGrams {
    protein: number
    fat: number
    carbohydrates: number
}

export const goalCalculatedGramsState = selector<MacroGrams | null>({
    key: 'goalMacros',
    get: ({ get }) => {
        const goal = get(goalState)
        if (goal) {
            const macros: MacroGrams = {
                protein: Math.round(
                    (goal.calories * (parseInt(goal.protein) / 100)) / 4
                ),
                fat: Math.round(
                    (goal.calories * (parseInt(goal.fat) / 100)) / 9
                ),
                carbohydrates: Math.round(
                    (goal.calories * (parseInt(goal.carbohydrates) / 100)) / 4
                ),
            }
            return macros
        }
        return null
    },
})
