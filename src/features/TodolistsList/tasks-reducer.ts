import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {setAppStatusAC} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: TasksStateType = {}


export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks',
    async (todolistId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {tasks, todolistId}
    })



export const removeTaskTC = createAsyncThunk('tasks/removeTask',
    async  (param: { taskId: string, todolistId: string }, thunkAPI) => {
        const res = await  todolistsAPI.deleteTask(param.todolistId, param.taskId)
           return {taskId: param.taskId, todolistId: param.todolistId}
    })


export const addTaskTC = createAsyncThunk('tasks/addTask',
    (param: { title: string, todolistId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        return todolistsAPI.createTask(param.todolistId, param.title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC(task)
                    thunkAPI.dispatch(action)
                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, thunkAPI.dispatch)
            })
    })


export const updateTaskTC = createAsyncThunk('tasks/addTask',
    (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, thunkAPI) => {
        const state = thunkAPI.getState()

        // @ts-ignore
        const task = state.tasks[param.todolistId].find((t: any) => t.id === param.taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...param.model
        }

        return todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({
                        taskId: param.taskId,
                        model: param.model,
                        todolistId: param.todolistId
                    })
                    thunkAPI.dispatch(action)
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, thunkAPI.dispatch)
            })
    })


const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },

    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }

        });

    }
})

export const tasksReducer = slice.reducer

// actions
export const {addTaskAC, updateTaskAC} = slice.actions

// thunks


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

