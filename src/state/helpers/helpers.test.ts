import {helpersReducer, InitialStateType, setError, setStatus} from './helpers';
    let startState:InitialStateType
    beforeEach(()=>{
        startState =  {
            status:'idle',
            error:'some errorrr'
        }
    })

test('status should be change',()=>{
    const endState = helpersReducer(startState, setStatus('loading'))

   expect(endState.status).toBe('loading')
})

test('error should be active',()=>{
    const endState = helpersReducer(startState, setError('Messages some error'))

    expect(endState.error).toBeDefined()
})