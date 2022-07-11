import classNames from 'classnames'
import { AuthenticationTabs } from './Authentication'
import styles from './Header.module.scss'

export interface HeaderItemProps {
    navName: AuthenticationTabs
    navLink?: string
}

interface HeaderFunctionProps {
    onHeaderItemClick: (navName: AuthenticationTabs, navLink?: string) => void
}

interface Props {
    headerItemProps: HeaderItemProps
    headerFunctionProps: HeaderFunctionProps
    currentTab: string
}

const HeaderItem: React.FC<Props> = (props: Props) => {
    return (
        <div
            className={styles.headerItem}
            onClick={() =>
                props.headerFunctionProps.onHeaderItemClick(
                    props.headerItemProps.navName
                )
            }
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
        </div>
    )
}

interface HeaderProps {
    headerItems: HeaderItemProps[]
    onHeaderItemClick: (navName: AuthenticationTabs, navLink?: string) => void
    currentTab: string
}

export const Header: React.FC<HeaderProps> = ({
    headerItems,
    onHeaderItemClick,
    currentTab,
}: HeaderProps) => {
    return (
        <div className={styles.header}>
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
    )
}
