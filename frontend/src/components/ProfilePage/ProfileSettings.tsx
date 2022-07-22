import { Icon } from '@iconify/react'
import { Button } from '../common/Button'
import styles from './ProfileSettings.module.scss'
import { CloseOutlined } from '@ant-design/icons'
import { useSetRecoilState } from 'recoil'
import { modalOpen } from '../../state/main'

export const ProfileSettings = () => {
    const setModalVisible = useSetRecoilState(modalOpen)
    return (
        <div className={styles.settingsContainer}>
            <div className={styles.header}>
                Rediger profil{' '}
                <CloseOutlined
                    onClick={() => setModalVisible(false)}
                    className={styles.icon}
                />
            </div>
        </div>
    )
}
