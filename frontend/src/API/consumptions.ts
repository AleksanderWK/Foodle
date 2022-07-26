import { Meal } from '../state/kitchen'
import { PATH } from './main'
import { Consumption, Grocery } from './types'

export const addConsumption = async (
    userId: string,
    name: string,
    groceries: Grocery[],
    meals: Meal[]
): Promise<Consumption[]> => {
    return await fetch(PATH.concat('/consumptions/add'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            owner: userId,
            name: name,
            groceries: groceries,
            meals: meals,
        }),
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

export const getLastThirtyDaysConsumption = async (
    userId: string
): Promise<Consumption[]> => {
    return await fetch(PATH.concat(`/consumptions/${userId}/lastthirty`), {
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
