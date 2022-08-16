import { atom } from 'recoil'

export interface AccessToken {
    dateCreated: Date
    token: string
    userId: string
}

export interface User {
    _id: string
    accessToken: AccessToken
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
