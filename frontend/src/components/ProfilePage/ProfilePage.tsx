import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from 'recoil'
import {
    getProfilePictureByUserId,
    uploadProfilePicture,
} from '../../api/profile'
import { userState } from '../../state/user'
import { Card } from '../common/Card'
import { SettingOutlined } from '@ant-design/icons'
import styles from './ProfilePage.module.scss'
import { modalContent, modalOpen } from '../../state/main'
import { ProfileSettings } from './ProfileSettings'
import { NutritionGoal } from './NutritionGoal'

export const ProfilePage: React.FC = () => {
    const [image, setImage] = useState<any>('')
    const user = useRecoilValue(userState)
    const [modalVisible, setModalVisible] = useRecoilState(modalOpen)
    const setModalContent = useSetRecoilState(modalContent)
    const resetModal = useResetRecoilState(modalContent)

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

    useEffect(() => {
        console.log(modalVisible)
        if (modalVisible) {
            setModalContent(<ProfileSettings />)
        } else {
            resetModal()
        }
    }, [modalVisible])

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
                <SettingOutlined
                    className={styles.icon}
                    onClick={() => setModalVisible(true)}
                />
                <div className={styles.content}></div>
            </Card>
            <Card className={styles.dailyGoalCard}>
                <NutritionGoal />
            </Card>
            <Card className={styles.nutritionHistoryCard}></Card>
        </div>
    )
}
