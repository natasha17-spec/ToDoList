import {Dispatch} from 'redux'
import {
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType,
    setIsInitializedAC,
    SetIsInitializedACActionType
} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
   debugger
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
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
    return (dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType |SetIsInitializedACActionType>) => {
        debugger
        dispatch(setAppStatusAC('loading'))
        authAPI.logout().then(r => {
            debugger
            if (r.data.resultCode === 0) {
                debugger
                dispatch(setAppStatusAC('failed'))
                setIsLoggedInAC(false)
                dispatch(setIsInitializedAC(false))

                dispatch(setAppStatusAC('succeeded'))
            } else {

            }
        })
            .catch((err) => {
                handleServerAppError(err, dispatch)
            })
    }

}
type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
    isLoggedIn: boolean
}

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
