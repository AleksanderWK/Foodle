import { ReactNode } from 'react'
import { atom } from 'recoil'
import { Feedback } from '../components/common/Feedback'

export const globalFeedbackState = atom<Feedback | null>({
    key: 'globalFeedback',
    default: null,
})

export const modalOpen = atom<boolean>({
    key: 'modalOpen',
    default: false,
})

export const modalContent = atom<ReactNode>({
    key: 'modalContent',
    default: null,
})
