import { atom, selector } from 'recoil'

export interface User {
    _id: string
    dateCreated: Date
    username: string
    email: string
    password: string
    shoppinglist: string
}

export const userState = atom<User | null>({
    key: 'user',
    default: null,
})
