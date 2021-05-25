import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {handleServerAppError} from '../utils/error-utils';
import {setIsLoggedInAC} from '../features/login/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            // @ts-ignore
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
})
export const appReducer = slice.reducer
export const {setAppStatusAC, setIsInitializedAC, setAppErrorAC} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export const isInitializedAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.authMe()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value: true}))
                    dispatch(setIsInitializedAC({isInitialized: true}))

                } else {
                    dispatch(setIsLoggedInAC({value: false}))
                    dispatch(setIsInitializedAC({isInitialized: true}))
                }
            })
            .catch((err) => {
                handleServerAppError(err, dispatch)
            })

    }
}


