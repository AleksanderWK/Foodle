import classNames from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import { Card } from '../common/Card'
import styles from './MaaltidCreator.module.scss'
import { CloseOutlined, SearchOutlined, CheckOutlined } from '@ant-design/icons'
import { Input } from '../common/Input'
import { Button } from '../common/Button'
import { Consumption, Grocery } from '../../api/types'
import { useRecoilValue } from 'recoil'
import { userState } from '../../state/user'
import { Meal } from '../../state/kitchen'

interface Props {
    visible: boolean
    onSetVisible: (visible: boolean) => void
}

export const MaaltidCreator = ({ visible, onSetVisible }: Props) => {
    const [searchShowing, setSearchShowing] = useState(false)
    const user = useRecoilValue(userState)
    const [consumption, setConsumption] = useState<Consumption>({
        name: '',
        owner: user ? user?._id : '',
        groceries: [],
        meals: [],
        consumptionDate: new Date(),
    })

    const resetState = () => {
        setConsumption({
            name: '',
            owner: user ? user?._id : '',
            groceries: [],
            meals: [],
            consumptionDate: new Date(),
        })
    }

    useEffect(() => {
        console.log(consumption)
    }, [consumption])

    return (
        <Card
            className={classNames(
                styles.addMealContainer,
                visible && styles.visible
            )}
        >
            <div
                className={styles.addMealWrapper}
                style={{
                    transform: `translateX( ${searchShowing ? '-50%' : '0%'})`,
                }}
            >
                <div className={styles.addMaaltidInfo}>
                    <div className={styles.header}>
                        {'Legg til måltid'}
                        <CloseOutlined
                            className={styles.closeIcon}
                            onClick={() => onSetVisible(false)}
                        />
                    </div>
                    <Input
                        value={consumption.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setConsumption((prevState) => ({
                                ...prevState,
                                ['name']: e.target.value,
                            }))
                        }
                        placeholder={'Navn på måltid...'}
                    />
                    <div className={styles.timeGroup}>
                        <div> Tidspunkt:</div>{' '}
                        <input
                            type={'time'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setConsumption((prevState) => ({
                                    ...prevState,
                                    ['consumptionDate']: new Date(
                                        e.target.value
                                    ),
                                }))
                            }
                        />
                    </div>

                    <div className={styles.maaltidContentsWrapper}>
                        <div className={styles.maaltidContentsHeader}>
                            Innhold:
                        </div>
                        <div className={styles.maaltidContents}>
                            Du har ikke innhold i måltidet ditt enda! Trykk på
                            søk for å legge til noe.
                            <SearchOutlined
                                onClick={() => setSearchShowing(true)}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button
                            onClick={function (): void {
                                throw new Error('Function not implemented.')
                            }}
                            type={'Save'}
                        >
                            Lagre
                        </Button>
                        <Button onClick={() => resetState()} type={'Delete'}>
                            Nullstill
                        </Button>
                    </div>
                </div>
                <div className={styles.searchMaaltidContents}>
                    <span className={styles.checkInput}>
                        <Input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                //search(e.target.value)
                            }}
                            placeholder={
                                'Søk på produkter og matretter til måltidet...'
                            }
                            className={styles.searchBar}
                            value={''}
                        />
                        <CheckOutlined
                            className={styles.check}
                            onClick={() => {
                                setSearchShowing(false)
                                // setSearchValue('')
                                // setSearchResult(null)
                            }}
                        />
                    </span>
                </div>
            </div>
        </Card>
    )
}
