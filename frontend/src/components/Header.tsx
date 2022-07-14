import classNames from 'classnames'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { LocationToNavNameMap } from '../FoodleApp'
import { userState } from '../state/user'
import { Button } from './common/Button'
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

    const logout = () => {
        setIsLogout(true)
        setTimeout(() => setUserState(null), 450)
    }

    return (
        <div
            className={classNames(
                styles.headerContainer,
                isLogout && styles.logout
            )}
        >
            <div className={styles.header}>
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
        </div>
    )
}
