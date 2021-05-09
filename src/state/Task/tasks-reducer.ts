import {TasksStateType} from '../../app/AppWithRedux';
import {v1} from 'uuid';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType,
} from '../todolist/todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType} from '../store';
import {setError, SetErrorType, setStatus, SetStatusType} from '../helpers/helpers-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}
export type SetTaskTitleActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTaskTitleActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLIST': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTaskTitleActionType =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

export const fetchTaskThunk = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetStatusType>) => {
        dispatch(setStatus('loading'))
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setStatus('succeeded'))
                    let action = res.data.items
                    dispatch(setTasksAC(action, todolistId))
                }
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetErrorType | SetStatusType>) => {
        dispatch(setStatus('loading'))
        todolistsAPI.createTask(title, todolistId)
            .then(res => {
                if(res.data.resultCode === 0){
                    dispatch(setStatus('succeeded'))
                    // @ts-ignore
                    const task = res.data.data.item
                    const action = addTaskAC(task)
                    dispatch(action)
                } else {
                    if(res.data.messages.length)dispatch(setError(res.data.messages[0]))

                }

            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetStatusType>) => {
        dispatch(setStatus('loading'))
        todolistsAPI.deleteTask(taskId, todolistId)
            .then(res => {

                if (res !== null) {
                    dispatch(setStatus('succeeded'))
                    dispatch(removeTaskAC(taskId, todolistId))
                }
            })
    }
}
export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetStatusType>, getState: () => AppRootStateType) => {
        let state = getState()
        let newTask = state.tasks[todolistId].find(t => t.id === taskId)
        if (!newTask) {
            return
        }
        const model: UpdateTaskModelType = {
            title: newTask.title,
            status: status,
            deadline: newTask.deadline,
            description: newTask.description,
            priority: newTask.priority,
            startDate: newTask.startDate
        }
        dispatch(setStatus('loading'))
        todolistsAPI.updateTask(taskId, model, todolistId)
            .then(res => {
                if (res !== null) {
                    dispatch(setStatus('succeeded'))
                    // @ts-ignore
                    dispatch(changeTaskStatusAC(taskId, status,todolistId))
                }
            })
    }
}


export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetStatusType>, getState: () => AppRootStateType) => {
        let state = getState()
        let newTask = state.tasks[todolistId].find(t => t.id === taskId)
        if (!newTask) {
            return
        }
        const model: UpdateTaskModelType = {
            title:title,
            status: newTask.status,
            deadline: newTask.deadline,
            description: newTask.description,
            priority: newTask.priority,
            startDate: newTask.startDate
        }

        todolistsAPI.updateTask(taskId, model, todolistId)
            .then(res => {
                debugger
                if (res !== null) {
                    // @ts-ignore
                    dispatch(changeTaskTitleAC(taskId, title,todolistId))
                }
            })
    }
}
