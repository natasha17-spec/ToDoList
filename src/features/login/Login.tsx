import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {Redirect} from 'react-router-dom'
import {useFormik} from 'formik';
import {loginTC} from './auth-reducer';
import {LoginParamsType} from '../../api/todolists-api';

export const Login = () => {
    debugger
    const dispatch = useDispatch()
    const loginValue = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    let onLogin = (values: LoginParamsType) => {
        dispatch(loginTC(values))
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: onLogin,
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }


        }
    })

    if (loginValue) {
        debugger
        return <Redirect to="/"/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                        target={'_blank'}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p> Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            {...formik.getFieldProps('password')}
                            type="password"
                            label="Password"
                            margin="normal"
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            {...formik.getFieldProps('rememberMe')}
                            label={'Remember me'}
                            control={<Checkbox/>}
                        />


                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}