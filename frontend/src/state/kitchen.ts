import { atom } from 'recoil'
import { Grocery } from '../api/types'

export interface Meal {
    name: string
    groceries: Grocery[]
}

export const mealsState = atom<Meal[]>({
    key: 'mealsState',
    default: [],
})

export const currentMealState = atom<Meal>({
    key: 'currentMealState',
    default: { name: '', groceries: [] },
})
