import { atom } from 'recoil'
import { Meal } from '../api/types'

export const mealsState = atom<Meal[]>({
    key: 'mealsState',
    default: [],
})

export const currentMealState = atom<Meal>({
    key: 'currentMealState',
    default: {
        _id: '',
        owner: '',
        mealName: '',
        groceries: [],
        dateCreated: new Date(),
    },
})
