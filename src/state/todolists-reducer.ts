import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {useEffect} from 'react';
import {Dispatch} from 'redux';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type SetTodolistActionType = {
    type: 'SET-TODOLIST',
    todolists: TodolistType[]
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }

        case 'SET-TODOLIST': {
            return action.todolists.map((tl)=>{
                return {
                    ...tl,filter:'all'
                }
            })
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setTodolistsAC = (todolists:TodolistType[]):SetTodolistActionType=>{
    return {
        type:'SET-TODOLIST', todolists
    }
}
export const fetchTodolistsThunk =()=>{
    debugger
    return (dispatch:Dispatch)=>{
        debugger
    todolistsAPI.getTodolists()
        .then((res) => {
            let action = res.data
            dispatch(setTodolistsAC(action))
        })
}}
export const fetchRemoveTodolistTodolists =(id:string)=>{
   return (dispatch:Dispatch)=>{
        todolistsAPI.deleteTodolist(id)
            .then((res) => {
                if(res.status === 200){
                    dispatch(removeTodolistAC(id))
                } else {
                    throw new Error('deleteTodolist call something error')
                }
            })
    }
}
export const fetchChangeTodolistTittle =(id: string, title: string)=>{
   return (dispatch:Dispatch)=>{
        todolistsAPI.updateTodolist(id,title)
            .then((res) => {
                if(res.status === 200){
                    dispatch(changeTodolistTitleAC(id,title))
                } else {
                    throw new Error('deleteTodolist call something error')
                }
            })
    }
}
export const fetchCreateTodolist =(title: string)=>{
    debugger
    return (dispatch:Dispatch)=>{
        todolistsAPI.createTodolist(title)
            .then((res) => {
                debugger
                if(res.status === 200){
                    dispatch(addTodolistAC(title))
                } else {
                    throw new Error('deleteTodolist call something error')
                }
            })
    }
}


