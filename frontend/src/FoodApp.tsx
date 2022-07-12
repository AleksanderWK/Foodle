import { useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Authentication, AuthenticationTabs } from './components/Authentication'
import { Header } from './components/Header'
import styles from './food.module.scss'
import { userState } from './state/user'

export const FoodApp: React.FunctionComponent = () => {
    const user = useRecoilValue(userState)

    return (
        <>
            {user ? (
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header
                                    headerItems={[]}
                                    onHeaderItemClick={function (
                                        navName: AuthenticationTabs,
                                        navLink?: string | undefined
                                    ): void {
                                        throw new Error(
                                            'Function not implemented.'
                                        )
                                    }}
                                    currentTab={''}
                                />{' '}
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
