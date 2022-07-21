import { PATH } from './main'

export const uploadProfilePicture = async (
    formData: FormData
): Promise<any> => {
    console.log('hei')
    return await fetch(PATH.concat(`/users/upload`), {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else return null
        })
        .then((response) => {
            return response
        })
}
