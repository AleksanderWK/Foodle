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
