import { atom } from 'recoil'
import { Feedback } from '../components/common/Feedback'

export const globalFeedbackState = atom<Feedback | null>({
    key: 'globalFeedback',
    default: null,
})
