import {Dispatch} from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {authApi} from '../../api/todolists-api';
import {handleServerAppError} from '../../utils/error-utils';

const initialState:InitialStateLoginType = {
    userId: 0
}

type LoginType = {
    type: 'LOGIN'
    userId:number
}

type ActionType = LoginType

export const authReducer = (state:InitialStateLoginType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'LOGIN': {
            return {...state, userId: action.userId}
        }
        default:
            return state
    }
}
export const loginAC = (userId:number) =>
    ({type: 'LOGIN', userId} as const)

// thunks
export const authTC = (email: string, password: string, rememberMe: boolean) => {
    debugger
    return (dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
        debugger
        dispatch(setAppStatusAC('loading'))
        authApi.login({email, password, rememberMe}).then(r => {
            if (r.data.resultCode === 0) {
                loginAC(r.data.data.userId)
                dispatch(setAppStatusAC('succeeded'))
                alert('login ok')
            } else {
                handleServerAppError(r.data, dispatch)
            }
        })
            .catch((err) => {
                throw new Error(err)
            })
    }

}
export type InitialStateLoginType ={
    userId:number
}