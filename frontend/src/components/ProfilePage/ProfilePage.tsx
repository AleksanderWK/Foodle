import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
    getProfilePictureByUserId,
    uploadProfilePicture,
} from '../../api/users'
import { userState } from '../../state/user'
import styles from './ProfilePage.module.scss'

export const ProfilePage: React.FC = () => {
    const [file, setFile] = useState<FileList | null>(null)
    const [image, setImage] = useState<any>('')
    const user = useRecoilValue(userState)

    const saveImage = async () => {
        if (user && file) {
            const form = new FormData()
            form.append('file', file[0])
            form.append('userId', user._id)
            await uploadProfilePicture(form)
            const picture = await getProfilePictureByUserId(user._id)
            if (picture != null) {
                const reader = new FileReader()
                reader.readAsDataURL(picture)
                reader.onloadend = () => {
                    const base64data = reader.result
                    setImage(base64data)
                    console.log(base64data)
                }
            }
        }
    }
    return (
        <div>
            <input
                type="file"
                name="file"
                id="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFile(e.target.files)
                }}
            />

            <button onClick={() => saveImage()}>Save</button>

            <img src={image} alt="" />
        </div>
    )
}
