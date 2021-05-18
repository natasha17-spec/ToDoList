import {Dispatch} from 'redux'
import {setAppStatusAC, setIsInitializedAC} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    debugger
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: { message: string; }) => {
            handleServerNetworkError(error, dispatch)
        })
}


export const logoutTC = () => {
    debugger
    return (dispatch: Dispatch) => {
        debugger
        dispatch(setAppStatusAC({status: 'loading'}))
        authAPI.logout().then(r => {
            debugger
            if (r.data.resultCode === 0) {
                debugger
                dispatch(setAppStatusAC({status: 'failed'}))
                setIsLoggedInAC({value: false})
                dispatch(setIsInitializedAC({isInitialized: false}))

                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
            }
        })
            .catch((err) => {
                handleServerAppError(err, dispatch)
            })
    }

}


