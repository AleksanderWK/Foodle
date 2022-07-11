const PATH = 'http://localhost:3001'

export interface User {
    username: string
    email: string
    password: string
}

export interface Grocery {
    Matvare: string
    Vann: string
    Kilojoule: string
    Kilokalorier: string
    Fett: string
    Mettet: string
    Trans: string
    Enumettet: string
    Flerumettet: string
    'Omega-3': string
    'Omega-6': string
    Kolesterol: string
    Karbohydrat: string
    Stivelse: string
    'Tilsatt sukker': string
    Kostfiber: string
    Protein: string
    Salt: string
    Alkohol: string
    'Vitamin A': string
    Retinol: string
    'Beta-karoten': string
    'Vitamin D': string
    'Vitamin E': string
    Tiamin: string
    Riboflavin: string
    Niacin: string
    'Vitamin B6': string
    Folat: string
    'Vitamin B12': string
    'Vitamin C': string
    Kalsium: string
    Jern: string
    Natrium: string
    Kalium: string
    Magnesium: string
    Sink: string
    Selen: string
    Kopper: string
    Fosfor: string
    Jod: string
}

export const registerUser = async (user: User) => {
    await fetch(PATH.concat('/users/register'), {
        method: 'POST',
        body: JSON.stringify(user),
    }).then((response) => {
        console.log(response)
        return response.json()
    })
}

export const getGroceries = async () => {
    await fetch(PATH.concat('/groceries'), {
        method: 'GET',
    }).then((response) => {
        return response.json()
    })
}
