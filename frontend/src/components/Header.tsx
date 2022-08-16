import classNames from 'classnames'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { LocationToNavNameMap } from '../FoodleApp'
import { globalFeedbackState } from '../state/main'
import { userState } from '../state/user'
import useFetch, { PATH } from '../utils/hooks/useFetch'
import { Button } from './common/Button'
import { FeedbackTypes } from './common/Feedback'
import { SearchField } from './common/SearchField'
import styles from './Header.module.scss'

export interface HeaderItemProps {
    navName: string
}

interface HeaderFunctionProps {
    onHeaderItemClick: (navName: string) => void
}

interface Props {
    headerItemProps: HeaderItemProps
    headerFunctionProps: HeaderFunctionProps
}

const HeaderItem: React.FC<Props> = (props: Props) => {
    const currentTab = useLocation()

    return (
        <NavLink
            className={styles.headerItem}
            onClick={() =>
                props.headerFunctionProps.onHeaderItemClick(
                    props.headerItemProps.navName
                )
            }
            to={props.headerItemProps.navName}
        >
            {LocationToNavNameMap[props.headerItemProps.navName]}
            <div
                className={classNames(
                    styles.navIndicator,
                    props.headerItemProps.navName ==
                        currentTab.pathname.slice(1)
                        ? styles.active
                        : styles.inactive
                )}
            />
        </NavLink>
    )
}

interface HeaderProps {
    headerItems: HeaderItemProps[]
    onHeaderItemClick: (navName: string) => void
}

export const Header: React.FC<HeaderProps> = ({
    headerItems,
    onHeaderItemClick,
}: HeaderProps) => {
    const setUserState = useSetRecoilState(userState)
    const [isLogout, setIsLogout] = useState<boolean>(false)
    const currentTab = useLocation()
    const fetch = useFetch()
    const setFeedback = useSetRecoilState(globalFeedbackState)

    const logout = () => {
        setIsLogout(true)
        fetch.get(PATH.concat('/users/logout')).then(
            () => {
                setTimeout(() => {
                    setUserState(null)
                    localStorage.removeItem('user')
                }, 500)
            },
            () => {
                setIsLogout(false)
                setFeedback({
                    type: FeedbackTypes.ERROR,
                    message: 'Det skjedde en feil ved logout',
                })
                setTimeout(() => {
                    setFeedback(null)
                }, 5000)
            }
        )
    }

    return (
        <div
            className={classNames(
                currentTab.pathname == '/Hjem'
                    ? styles.headerContainer
                    : styles.headerContainerNoSearch,
                isLogout && styles.logout
            )}
        >
            <div
                className={classNames(
                    styles.header,
                    currentTab.pathname != '/Hjem' && styles.noSearch
                )}
            >
                <div className={styles.title}>Foodle</div>
                <div className={styles.headerItemsContainer}>
                    {headerItems.map((item) => (
                        <HeaderItem
                            key={item.navName}
                            headerItemProps={{
                                navName: item.navName,
                            }}
                            headerFunctionProps={{ onHeaderItemClick }}
                        />
                    ))}
                </div>
                <Button onClick={() => logout()} type={'Secondary'}>
                    Logg ut
                </Button>
            </div>
            <div
                className={classNames(
                    styles.searchFieldContainer,
                    currentTab.pathname != '/Hjem' && styles.hidden
                )}
            >
                <SearchField placeholder={'Søk på matvarer eller merker...'} />
            </div>
        </div>
    )
}
