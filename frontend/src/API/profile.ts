import { PATH } from './main'

export const uploadProfilePicture = async (
    formData: FormData
): Promise<Blob | null> => {
    return await fetch(PATH.concat(`/users/upload`), {
        method: 'POST',
        body: formData,
    }).then((response) => {
        if (response.ok) {
            return response.blob()
        } else return null
    })
}

export const getProfilePictureByUserId = async (
    userId: string
): Promise<Blob | null> => {
    return fetch(PATH.concat(`/users/${userId}/picture`), {
        method: 'GET',
    }).then((response) => {
        if (response.ok) {
            return response.blob()
        } else return null
    })
}
