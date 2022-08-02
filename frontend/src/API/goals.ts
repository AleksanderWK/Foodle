import { PATH } from './main'
import { Goal, GoalData } from './types'

export const addGoal = async (goal: GoalData): Promise<Goal> => {
    return fetch(PATH.concat('/goals/add'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
    }).then((response) => (response.ok ? response.json() : null))
}

export const getGoal = async (userid: string): Promise<Goal> => {
    return fetch(PATH.concat(`/goals/${userid}`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => (response.ok ? response.json() : null))
}
