import { Credentials, Grocery, RegisterValues } from './types'
import { User } from '../state/user'
import { ShoppingList } from '../state/shoppinglist'
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

export const getUser = async (userId: string): Promise<User> => {
    return await fetch(PATH.concat(`/users/${userId}`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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

export const getUserShoppingListByUser = async (
    user: User
): Promise<ShoppingList> => {
    return await fetch(PATH.concat(`/users/${user.username}/shoppinglist`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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

export const getUserShoppingListByUserId = async (
    userId: string
): Promise<ShoppingList> => {
    return await fetch(PATH.concat(`/shoppinglists/${userId}`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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

export const manageShoppingList = async (
    action: 'add' | 'delete',
    groceryId: string,
    shoppinglistId: string
): Promise<ShoppingList> => {
    return await fetch(PATH.concat(`/shoppinglists/${action}`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            groceryId: groceryId,
            shoppinglistId: shoppinglistId,
        }),
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
