import { Meal } from '../state/kitchen'
import { PATH } from './main'

interface MealData {
    owner: string
    mealName: string
    groceryIds: string[]
}

export const createMeal = async (meal: MealData): Promise<Meal> => {
    return await fetch(PATH.concat('/meals/create'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(meal),
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else return null
        })
        .then((response) => {
            return response
        })
}

export const getUserMeals = async (userId: string) => {
    fetch(PATH.concat(`/meals/${userId}`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else return null
        })
        .then((response) => {
            return response
        })
}
