import axios from 'axios';

export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'aee8e0dc-0edb-41fe-ae30-2037f01a0933'
    }
}

export const todolistsApi = {
    getTodolist() {
        let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodolist(newTitle:string) {
        let promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title: newTitle}, settings)
        return promise
    },
    changeTitleTodolist(todolistId:string,newTitle:string) {
        let promise = axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: newTitle}, settings)
        return promise
    },
    deleteTodolist(todolistId:string) {
        let promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },
}