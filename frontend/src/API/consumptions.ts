import { Meal } from './types'
import { PATH } from './main'
import { Consumption } from './types'

export const addConsumption = async (
    consumption: Consumption
): Promise<Consumption[]> => {
    return await fetch(PATH.concat('/consumptions/add'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(consumption),
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
