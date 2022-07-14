import { Credentials, Grocery, RegisterValues } from './types'
import { User } from '../state/user'
const PATH = 'http://localhost:3001'

export const registerUser = async (
    user: RegisterValues
): Promise<User | null> => {
    return await fetch(PATH.concat('/users/register'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
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

export const loginUser = async (
    credentials: Credentials
): Promise<User | null> => {
    return await fetch(PATH.concat('/users/login'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
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

export const searchGroceries = async (
    searchObject: Object
): Promise<Grocery[] | null> => {
    return await fetch(PATH.concat('/groceries/search'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchObject),
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
