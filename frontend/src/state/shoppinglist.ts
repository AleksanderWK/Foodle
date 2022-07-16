import { atom, selector } from 'recoil'
import { Grocery } from '../api/types'

export interface ShoppingList {
    _id: string
    owner: string
    dateCreated: string
    groceries: Grocery[]
}

export const shoppingListState = atom<ShoppingList | null>({
    key: 'shoppinglist',
    default: null,
})
