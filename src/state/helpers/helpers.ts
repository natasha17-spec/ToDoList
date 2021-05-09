export type InitialStateType ={
    status:'idle' | 'loading'| 'succeeded' | 'failed'
    error:string | null
}

const initialState:InitialStateType =  {
    status:'idle',
    error:'some errorrr'
}

type StatusType = 'idle' | 'loading'| 'succeeded' | 'failed'

type SetAppStatus = {
    type:'APP/SET-STATUS'
    status:StatusType
}
type SetErrorStatus = {
    type:'APP/SET-ERROR'
    error:string | null
}



type ActionsType = SetAppStatus | SetErrorStatus

export const helpersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status:action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error:action.error}
        }

        default:
            return {...state};
    }
}


export const setStatus = (status:StatusType):SetAppStatus=>{
    return {
        type:'APP/SET-STATUS', status
    }
}

export const setError = (error:string|null):SetErrorStatus=>{
    return {
        type:'APP/SET-ERROR', error
    }
}