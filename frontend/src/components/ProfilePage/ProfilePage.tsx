import { useEffect, useState } from 'react'
import { uploadProfilePicture } from '../../api/users'
import styles from './ProfilePage.module.scss'

export const ProfilePage: React.FC = () => {
    const [file, setFile] = useState<FileList | null>(null)

    const save = async () => {
        if (file) {
            const fileForm = new FormData()
            fileForm.append('file', file[0])
            const res = await uploadProfilePicture(fileForm)
            console.log(res)
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

            <button onClick={() => save()}>Save</button>
        </div>
    )
}
