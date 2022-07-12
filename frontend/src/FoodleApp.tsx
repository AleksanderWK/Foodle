import { useEffect, useState } from 'react'
import {
    Outlet,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Authentication } from './components/Authentication'
import { Header, HeaderItemProps } from './components/Header'
import styles from './food.module.scss'
import { userState } from './state/user'

export const FoodleApp: React.FunctionComponent = () => {
    const [user, setUserState] = useRecoilState(userState)
    const [currentTab, setCurrentTab] = useState('Hjem')
    const navigate = useNavigate()
    const location = useLocation()

    const headerItems: HeaderItemProps[] = [
        {
            navName: 'Hjem',
        },
        {
            navName: 'Kjøleskap',
        },
        {
            navName: 'Kjøkken',
        },
        {
            navName: 'Profil',
        },
    ]

    const onHeaderItemClicked = (navName: string) => {
        setCurrentTab(navName)
    }

    useEffect(() => {
        if (location.pathname == '/') {
            setUserState(null)
        }
    }, [location])

    useEffect(() => {
        if (user) {
            navigate('/hjem', { replace: true })
        } else navigate('/', { replace: true })
    }, [user])

    return (
        <>
            {user ? (
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className={styles.pageContainer}>
                                <Header
                                    headerItems={headerItems}
                                    currentTab={currentTab}
                                    onHeaderItemClick={onHeaderItemClicked}
                                />
                                <Outlet />
                            </div>
                        }
                    >
                        <Route path="hjem" element={'Hjem'} />
                        <Route path="kjoleskap" element={'Kjøleskap'} />
                        <Route path="kjokken" element={'Kjøkken'} />
                        <Route path="profil" element={'Profil'} />
                        <Route path="*" element={'404 not found'} />
                    </Route>
                </Routes>
            ) : (
                <div className={styles.container}>
                    <Authentication />
                </div>
            )}
        </>
    )
}
