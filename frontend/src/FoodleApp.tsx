import { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Authentication } from './components/Authentication'
import { Header, HeaderItemProps } from './components/Header'
import styles from './food.module.scss'
import { userState } from './state/user'

export const FoodleApp: React.FunctionComponent = () => {
    const user = useRecoilValue(userState)
    const [currentTab, setCurrentTab] = useState('Hjem')
    let navigate = useNavigate()

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
        navigate('/hjem', { replace: true })
    }, [user])

    return (
        <>
            {user ? (
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header
                                    headerItems={headerItems}
                                    currentTab={currentTab}
                                    onHeaderItemClick={onHeaderItemClicked}
                                />
                                <Outlet />
                            </>
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
