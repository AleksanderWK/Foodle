import { useEffect, useState } from 'react'
import {
    Outlet,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Authentication } from './components/Authentication'
import { Header, HeaderItemProps } from './components/Header'
import { Homepage } from './components/HomePage/Homepage'
import styles from './food.module.scss'
import { userState } from './state/user'
import { GithubFilled, LinkedinFilled } from '@ant-design/icons'
import { ExpandingContainer } from './components/KitchenPage/ExpandingContainer'
import { Feedback, FeedbackTypes } from './components/common/Feedback'
import { globalFeedbackState } from './state/main'

export const LocationToNavNameMap: Record<string, string> = {
    Hjem: 'Hjem',
    Kjokken: 'Kjøkken',
    Kjoleskap: 'Kjøleskap',
    Profil: 'Profil',
}

export const FoodleApp: React.FunctionComponent = () => {
    const [user, setUserState] = useRecoilState(userState)
    const [currentTab, setCurrentTab] = useState('Hjem')
    const feedback = useRecoilValue(globalFeedbackState)
    const navigate = useNavigate()
    const location = useLocation()

    const headerItems: HeaderItemProps[] = [
        {
            navName: 'Hjem',
        },
        {
            navName: 'Kjoleskap',
        },
        {
            navName: 'Kjokken',
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
            navigate('/Hjem', { replace: true })
        } else navigate('/', { replace: true })
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
                                    onHeaderItemClick={onHeaderItemClicked}
                                />
                                <div className={styles.pageSection}>
                                    <Outlet />
                                    {feedback && (
                                        <Feedback
                                            type={feedback.type}
                                            message={feedback.message}
                                            className={styles.globalFeedback}
                                        />
                                    )}
                                </div>

                                <div className={styles.footer}>
                                    <div className={styles.footerTitle}>
                                        Foodle
                                    </div>
                                    <div className={styles.links}>
                                        <GithubFilled
                                            className={styles.linkIcon}
                                            onClick={() => {
                                                window.location.replace(
                                                    'https://github.com/AleksanderWK'
                                                )
                                            }}
                                        />
                                        <LinkedinFilled
                                            className={styles.linkIcon}
                                            onClick={() => {
                                                window.location.replace(
                                                    'https://www.linkedin.com/in/aleksawk/'
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className={styles.credits}>
                                        Aleksander W. Karlsen, 2022
                                    </div>
                                </div>
                            </>
                        }
                    >
                        <Route path="hjem" element={<Homepage />} />
                        <Route path="kjoleskap" element={'Kjøleskap'} />
                        <Route
                            path="kjokken"
                            element={<ExpandingContainer />}
                        />
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
