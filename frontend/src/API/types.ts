export interface RegisterValues {
    username: string
    email: string
    password: string
}

export interface DefaultResponse {
    message: string
    successful: boolean
}

export interface Credentials {
    username: string
    password: string
}

export interface Grocery {
    _id: string
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

export interface Consumption {
    owner: string
    name: string
    groceries: Grocery[]
    meals: Meal[]
    consumptionDate: Date
}

export interface Meal {
    _id: string
    owner: string
    mealName: string
    dateCreated: Date
    groceries: Grocery[]
}

export interface GoalData {
    owner: string
    calories: number
    protein: string
    fat: string
    carbohydrates: string
}

export interface Goal extends GoalData {
    _id: string
}
