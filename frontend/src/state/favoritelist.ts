import { atom } from 'recoil'
import { FavoriteList } from '../api/types'

export const favoritelistState = atom<FavoriteList>({
    key: 'favoritelist',
    default: { _id: '', owner: '', groceries: [], meals: [] },
})
