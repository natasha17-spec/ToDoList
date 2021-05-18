import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {isInitializedAppTC, RequestStatusType} from './app-reducer'
import {BrowserRouter, Route} from 'react-router-dom';
import {Login} from '../features/login/Login';
import {logoutTC} from '../features/login/auth-reducer';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    debugger
    // @ts-ignore
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        debugger
        dispatch(isInitializedAppTC())
    }, [isLoggedIn, isAuth])

    const onHandleToLogout = useCallback(() => {
        dispatch(logoutTC())

    }, [])
    if (!isAuth) {
        return <div style={{position: 'fixed', top: '30%', left: '50%'}}><CircularProgress/></div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn &&
                        <Button color="inherit" variant={'outlined'} onClick={onHandleToLogout}>
                            Logout
                        </Button>
                        }

                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route exact path={'/login'} render={() => <Login/>}/>
                </Container>
            </div>
        </BrowserRouter>

    )
}

export default App
