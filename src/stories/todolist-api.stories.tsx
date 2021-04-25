import React, {useEffect, useState} from 'react';
import {todolistsApi} from '../api/todolists-api';


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsApi.getTodolist().then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    let newTitle = 'ervertvetertvertvsetser'

    useEffect(() => {
        todolistsApi.createTodolist(newTitle).then((res) => {
            setState(res.data)
        })
    }, [newTitle])
    return <div>{JSON.stringify(state)}</div>
}

export const ChangeTitleTodolists = () => {
    const [state, setState] = useState<any>(null)
    let newTitle = 'New Todo'
    let todolistId = '43b4e93f-040e-478c-8ef1-a5497018f107'
    useEffect(() => {
        todolistsApi.changeTitleTodolist(todolistId, newTitle).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = 'a8e3a8d3-a0ab-468c-9621-c64b232af249'
    useEffect(() => {
        todolistsApi.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}