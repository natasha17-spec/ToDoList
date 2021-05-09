export type InitialStateType ={
    status:'idle' | 'loading'| 'succeeded' | 'failed'
    error:string | null
}

const initialState:InitialStateType =  {
    status:'idle',
    error:'some errorrr'
}

export type StatusType = 'idle' | 'loading'| 'succeeded' | 'failed'

export type SetStatusType = {
    type:'APP/SET-STATUS'
    status:StatusType
}
export type SetErrorType = {
    type:'APP/SET-ERROR'
    error:string | null
}



type ActionsType = SetStatusType | SetErrorType

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


export const setStatus = (status:StatusType):SetStatusType=>{
    return {
        type:'APP/SET-STATUS', status
    }
}

export const setError = (error:string|null):SetErrorType=>{
    return {
        type:'APP/SET-ERROR', error
    }
}