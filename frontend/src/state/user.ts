import { atom, selector } from 'recoil'

export interface User {
    _id: string
    username: string
    email: string
    password: string
}

export const userState = atom<User | null>({
    key: 'user',
    default: null,
})
