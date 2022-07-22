import classNames from 'classnames'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalContent, modalOpen } from '../../state/main'
import { Card } from './Card'
import styles from './Modal.module.scss'

export const Modal = () => {
    const [modalVisible, setModalVisible] = useRecoilState(modalOpen)
    const content = useRecoilValue(modalContent)
    return (
        <div
            className={classNames(
                styles.backdrop,
                modalVisible && styles.visible
            )}
            onClick={() => {}}
        >
            <Card className={styles.modal}>{content}</Card>
        </div>
    )
}
