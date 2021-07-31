import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {setAppStatusAC} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppRootStateType} from '../../app/store';



export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks',
    async (todolistId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {tasks, todolistId}
    })


export const removeTaskTC = createAsyncThunk('tasks/removeTask',
    async (param: { taskId: string, todolistId: string }, thunkAPI) => {
        const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        return {taskId: param.taskId, todolistId: param.todolistId}
    })

export const addTaskTC = createAsyncThunk('tasks/addTask',
    async (param: { title: string, todolistId: string },
           {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.createTask(param.todolistId,param.title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return res.data.data.item
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }

    })


export const updateTaskTC = createAsyncThunk('tasks/updateTask',
    async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string },
           {dispatch, rejectWithValue,getState}) => {
        const state = getState() as AppRootStateType;
        const task = state.tasks[param.todolistId].find((t: any) => t.id === param.taskId)
        if (!task) {
            console.warn('task not found in the state')
            return rejectWithValue(null)
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

        let res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
            try {
                if (res.data.resultCode === 0) {
                   return param
                } else {
                    handleServerAppError(res.data, dispatch)
                    return rejectWithValue(null)
                }
            } catch (error){
                handleServerNetworkError(error, dispatch)
                return rejectWithValue(null)
            }

    })


const slice = createSlice({
    name: 'tasks',
    initialState:{} as TasksStateType,
    reducers: {
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
        builder.addCase(addTaskTC.fulfilled, (state, action) => {

           state[action.payload.todoListId].unshift(action.payload)

        });
        builder.addCase(updateTaskTC.fulfilled,
            (state,
             action) => {

            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }

        });

    }
})

export const tasksReducer = slice.reducer

// actions

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

