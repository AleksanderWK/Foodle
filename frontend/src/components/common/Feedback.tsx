import classNames from 'classnames'
import styles from './Feedback.module.scss'
import {
    CheckCircleOutlined,
    InfoCircleOutlined,
    AlertOutlined,
} from '@ant-design/icons'
import { ReactNode } from 'react'

export enum FeedbackTypes {
    INFORMATION = 'Information',
    ERROR = 'Error',
    SUCCESS = 'Success',
}

export interface Feedback {
    type: FeedbackTypes
    message: string
}

export const Feedback: React.FC<Feedback> = ({ type, message }) => {
    const feedbackTypeToIconMap: Record<string, ReactNode> = {
        Information: <InfoCircleOutlined className={styles.icon} />,
        Error: <AlertOutlined className={styles.icon} />,
        Success: <CheckCircleOutlined className={styles.icon} />,
    }

    return (
        <div
            className={classNames(
                styles.feedback,
                type == 'Information'
                    ? styles.information
                    : type == 'Error'
                    ? styles.error
                    : styles.success
            )}
        >
            {feedbackTypeToIconMap[type]}
            {message}
        </div>
    )
}
