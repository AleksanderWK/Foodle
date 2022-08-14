import React, { useState } from 'react'
import { Credentials, RegisterValues } from '../api/types'
import styles from './Authentication.module.scss'
import { Button } from './common/Button'
import { Input } from './common/Input'
import dashboardIllustration from '../assets/dashboard.svg'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Feedback, FeedbackTypes } from './common/Feedback'
import classNames from 'classnames'
import { useSetRecoilState } from 'recoil'
import { userState } from '../state/user'
import useFetch, { PATH } from '../utils/hooks/useFetch'

export enum AuthenticationTabs {
    LOGIN = 'Logg inn',
    REGISTER = 'Registrer deg',
}

export const Authentication: React.FunctionComponent = () => {
    const [loginValues, setLoginValues] = useState({
        username: '',
        password: '',
    })
    const [currentTab, setCurrentTab] = useState<AuthenticationTabs>(
        AuthenticationTabs.LOGIN
    )
    const [registerValues, setRegisterValues] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })
    const [feedback, setFeedback] = useState<null | Feedback>()
    const setUserState = useSetRecoilState(userState)
    const fetch = useFetch()

    const onInputChanged = (
        type: AuthenticationTabs,
        value: string,
        key: string
    ) => {
        switch (type) {
            case AuthenticationTabs.LOGIN:
                setLoginValues((prevState) => ({
                    ...prevState,
                    [key]: value,
                }))
                break
            case AuthenticationTabs.REGISTER:
                setRegisterValues((prevState) => ({
                    ...prevState,
                    [key]: value,
                }))
                break
        }
    }

    const switchTab = (tab: AuthenticationTabs) => {
        setCurrentTab(tab)
        setFeedback(null)
    }

    const submitLoginForm = async () => {
        setFeedback(null)
        const credentials: Credentials = {
            username: loginValues.username,
            password: loginValues.password,
        }
        fetch.post(PATH.concat('/users/login'), credentials).then(
            (user) => {
                setUserState(user)
            },
            (errorStatus) => {
                switch (errorStatus) {
                    case 404:
                        setFeedback({
                            type: FeedbackTypes.ERROR,
                            message: 'Feil brukernavn eller passord!',
                        })
                        break
                    case 401:
                        setFeedback({
                            type: FeedbackTypes.ERROR,
                            message:
                                'Bruker er ikke verifisert. Sjekk eposten din!',
                        })
                        break
                }
            }
        )
    }

    const submitRegisterForm = async () => {
        if (registerValues.password1 != registerValues.password2) {
            setFeedback({
                type: FeedbackTypes.ERROR,
                message: 'Passordene er ikke like!',
            })
        } else {
            setFeedback(null)
            const user: RegisterValues = {
                username: registerValues.username,
                password: registerValues.password1,
                email: registerValues.email,
            }
            fetch.post(PATH.concat('/users/register'), user).then(
                () => {
                    setFeedback({
                        type: FeedbackTypes.SUCCESS,
                        message: 'Bruker opprettet!',
                    })
                },
                (errorStatus) => {
                    switch (errorStatus) {
                        case 500:
                            setFeedback({
                                type: FeedbackTypes.INFORMATION,
                                message:
                                    'Det skjedde en feil ved opprettelse av bruker.',
                            })
                            break
                    }
                }
            )
        }
    }

    return (
        <div
            className={classNames(
                styles.authenticationContainer,
                currentTab == AuthenticationTabs.REGISTER && styles.moreHeight
            )}
        >
            <div
                className={classNames(
                    styles.illustrationContainer,
                    currentTab == AuthenticationTabs.REGISTER
                        ? styles.rightAligned
                        : styles.leftAligned
                )}
            >
                <img
                    src={dashboardIllustration}
                    alt="Dashboard illustrasjon"
                    className={styles.dashboardIllustration}
                    width={'80%'}
                />
                <div className={styles.ingress}>
                    Velkommen til <span className={styles.title}>Foodle</span>!{' '}
                    <br /> Foodle hjelper deg med å planlegge og holde oversikt
                    over matinntaket
                </div>
            </div>
            <div
                className={classNames(
                    styles.card,
                    currentTab == AuthenticationTabs.REGISTER
                        ? styles.leftAligned
                        : styles.rightAligned
                )}
            >
                <div className={styles.bigTitle}>Foodle</div>
                {feedback && (
                    <div className={styles.feedbackContainer}>
                        <Feedback
                            type={feedback.type}
                            message={feedback.message}
                        />
                    </div>
                )}
                <div className={styles.inputGroup}>
                    <Input
                        value={
                            currentTab == AuthenticationTabs.LOGIN
                                ? loginValues.username
                                : registerValues.username
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onInputChanged(
                                currentTab,
                                e.target.value,
                                'username'
                            )
                        }
                        placeholder={'Brukernavn'}
                        icon={<UserOutlined />}
                        error={feedback?.type == FeedbackTypes.ERROR}
                    />
                    {currentTab == AuthenticationTabs.REGISTER && (
                        <Input
                            value={registerValues.email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                onInputChanged(
                                    currentTab,
                                    e.target.value,
                                    'email'
                                )
                            }
                            placeholder={'E-mail'}
                            icon={<MailOutlined />}
                            error={feedback?.type == FeedbackTypes.ERROR}
                        />
                    )}

                    <Input
                        value={
                            currentTab == AuthenticationTabs.LOGIN
                                ? loginValues.password
                                : registerValues.password1
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onInputChanged(
                                currentTab,
                                e.target.value,
                                currentTab == AuthenticationTabs.LOGIN
                                    ? 'password'
                                    : 'password1'
                            )
                        }
                        placeholder={'Passord'}
                        type={'password'}
                        icon={<LockOutlined />}
                        error={feedback?.type == FeedbackTypes.ERROR}
                    />
                    {currentTab == AuthenticationTabs.REGISTER && (
                        <Input
                            value={registerValues.password2}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                onInputChanged(
                                    currentTab,
                                    e.target.value,
                                    'password2'
                                )
                            }
                            placeholder={'Gjenta passord'}
                            type={'password'}
                            icon={<LockOutlined />}
                            error={feedback?.type == FeedbackTypes.ERROR}
                        />
                    )}
                </div>
                <div className={styles.buttonGroup}>
                    <Button
                        onClick={() =>
                            currentTab == AuthenticationTabs.LOGIN
                                ? switchTab(AuthenticationTabs.REGISTER)
                                : submitRegisterForm()
                        }
                        type={
                            currentTab == AuthenticationTabs.REGISTER
                                ? 'Primary'
                                : 'Secondary'
                        }
                    >
                        Registrer deg
                    </Button>
                    <Button
                        onClick={() =>
                            currentTab == AuthenticationTabs.REGISTER
                                ? switchTab(AuthenticationTabs.LOGIN)
                                : submitLoginForm()
                        }
                        type={
                            currentTab == AuthenticationTabs.REGISTER
                                ? 'Secondary'
                                : 'Primary'
                        }
                    >
                        Logg inn
                    </Button>
                </div>
            </div>
        </div>
    )
}
