import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
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
    currentTab: string
}

const HeaderItem: React.FC<Props> = (props: Props) => {
    return (
        <NavLink
            className={styles.headerItem}
            onClick={() =>
                props.headerFunctionProps.onHeaderItemClick(
                    props.headerItemProps.navName
                )
            }
            to={props.headerItemProps.navName.replaceAll('ø', 'o')}
        >
            {props.headerItemProps.navName}
            <div
                className={classNames(
                    styles.navIndicator,
                    props.currentTab == props.headerItemProps.navName
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
    currentTab: string
}

export const Header: React.FC<HeaderProps> = ({
    headerItems,
    onHeaderItemClick,
    currentTab,
}: HeaderProps) => {
    const setUserState = useSetRecoilState(userState)

    return (
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
                        currentTab={currentTab}
                    />
                ))}
            </div>
            <Button onClick={() => setUserState(null)} type={'Secondary'}>
                Logg ut
            </Button>
        </div>
    )
}
