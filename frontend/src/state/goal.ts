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
                protein: (goal.calories * parseInt(goal.protein)) / 4,
                fat: (goal.calories * parseInt(goal.fat)) / 9,
                carbohydrates:
                    (goal.calories * parseInt(goal.carbohydrates)) / 4,
            }
            return macros
        }
        return null
    },
})
