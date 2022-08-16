import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../../state/user'
export const PATH = 'http://localhost:3001'

export enum RequestType {
    GET = 'GET',
    POST = 'POST',
}

const useFetch = () => {
    const [user, setUser] = useRecoilState(userState)

    const authHeader = (url: string) => {
        const token = user?.accessToken.token
        const isLoggedIn = !!token
        const isApiUrl = url.startsWith(PATH)
        if (isLoggedIn && isApiUrl) {
            return { Authorization: `Bearer ${token}` } as Record<
                string,
                string
            >
        } else {
            return {}
        }
    }

    const handleResponse = (response: Response) => {
        return response.text().then((text) => {
            const data = text && JSON.parse(text)

            if (!response.ok) {
                if (
                    [401, 403].includes(response.status) &&
                    user?.accessToken.token
                ) {
                    localStorage.removeItem('user')
                    setUser(null)
                }
                return Promise.reject(response.status)
            }
            return data
        })
    }

    const request = (method: RequestType) => {
        return (url: string, body?: Object) => {
            let requestOptions: RequestInit = {}
            if (body) {
                requestOptions = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeader(url),
                    },
                    body: JSON.stringify(body),
                }
            } else {
                requestOptions = {
                    method: method,
                    headers: authHeader(url),
                }
            }
            return fetch(url, requestOptions).then(handleResponse)
        }
    }

    return {
        get: request(RequestType.GET),
        post: request(RequestType.POST),
    }
}

export default useFetch
