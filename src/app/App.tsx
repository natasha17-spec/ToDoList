import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import {Login} from '../features/login/Login';
import {InitialStateLoginType} from '../features/login/auth-reducer';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const loginValue = useSelector<AppRootStateType, InitialStateLoginType>(state => state.auth)

    const onHandleToLogout=() => {
        if(loginValue.userId === null){
            return <Redirect to="/login"  />
        }
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
                        {loginValue.userId !== null ?
                            <Button color="inherit" variant={'outlined'} onClick={onHandleToLogout}>
                                Logout</Button> :
                            <Button color="inherit" variant={'outlined'}>
                                Login</Button>
                        }

                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route exact path={'/login'} render={() => <Login/>}/>
                    {/*<TodolistsList demo={demo}/>*/}
                </Container>
            </div>
        </BrowserRouter>

    )
}

export default App
