import { atom } from 'recoil'

export interface User {
    _id: string
    token: string
    dateCreated: Date
    username: string
    email: string
    password: string
    shoppinglist: string
    favoritelist: string
}

export const userState = atom<User | null>({
    key: 'user',
    default: null,
})
