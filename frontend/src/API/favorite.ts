import { FavoriteList } from './types'
import { PATH } from './main'

export const getFavoriteListByUserId = async (
    userId: string
): Promise<FavoriteList> => {
    return await fetch(PATH.concat(`/favoritelists/${userId}`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => (response.ok ? response.json() : null))
}

export const manageFavoriteList = async (
    action: 'add' | 'delete',
    favoritelistId: string,
    groceryId?: string,
    mealId?: string
): Promise<FavoriteList> => {
    return await fetch(PATH.concat(`/favoritelists/${action}`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            groceryId: groceryId,
            mealId: mealId,
            favoritelistId: favoritelistId,
        }),
    }).then((response) => (response.ok ? response.json() : null))
}
