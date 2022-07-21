import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
    getProfilePictureByUserId,
    uploadProfilePicture,
} from '../../api/profile'
import { userState } from '../../state/user'
import { Card } from '../common/Card'
import styles from './ProfilePage.module.scss'

export const ProfilePage: React.FC = () => {
    const [image, setImage] = useState<any>('')
    const user = useRecoilValue(userState)

    useEffect(() => {
        getProfilePicture()
    }, [])

    const getProfilePicture = async () => {
        if (user) {
            const picture = await getProfilePictureByUserId(user._id)
            if (picture != null) {
                const reader = new FileReader()
                reader.readAsDataURL(picture)
                reader.onloadend = () => {
                    const base64data = reader.result
                    setImage(base64data)
                }
            } else {
                setImage(null)
            }
        }
    }

    const saveImage = async (file: FileList | null) => {
        if (user && file) {
            const form = new FormData()
            form.append('file', file[0])
            form.append('userId', user._id)
            await uploadProfilePicture(form)
            getProfilePicture()
        }
    }

    const getMemberSinceDate = () => {
        const monthNamesNor = [
            'januar',
            'februar',
            'mars',
            'april',
            'mai',
            'juni',
            'juli',
            'august',
            'septemer',
            'oktober',
            'november',
            'desember',
        ]
        if (user && user.dateCreated) {
            const date = new Date(user.dateCreated)
            return monthNamesNor[date.getMonth()] + ' ' + date.getFullYear()
        }
    }
    return (
        <div className={styles.grid}>
            <Card className={styles.profileCard}>
                <div className={styles.offsetContentContainer}>
                    <Card className={styles.profilePicContainer}>
                        {image == null ? (
                            <>
                                <label
                                    htmlFor="file"
                                    className={styles.fileInputLabel}
                                >
                                    <Icon
                                        icon="bx:image-add"
                                        className={styles.uploadIcon}
                                    />
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    className={styles.fileInput}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => saveImage(e.target.files)}
                                />
                            </>
                        ) : (
                            <img src={image} className={styles.profileImage} />
                        )}
                    </Card>
                    <div className={styles.mainUserInfoContainer}>
                        <span className={styles.username}>
                            {user?.username}
                        </span>
                        <span className={styles.memberSinceText}>
                            {'Medlem siden ' + getMemberSinceDate()}
                        </span>
                    </div>
                </div>
            </Card>
            <Card className={styles.dailyGoalCard}></Card>
            <Card className={styles.nutritionHistoryCard}></Card>
        </div>
    )
}
