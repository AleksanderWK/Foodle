import { atom } from 'recoil'
import { Goal } from '../api/types'

export const goalState = atom<Goal | null>({
    key: 'goal',
    default: null,
})
