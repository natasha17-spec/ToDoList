import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer'
import {tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../AppWithRedux'
import {TodolistType} from '../api/todolists-api';
import {v1} from 'uuid';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
    let todo: TodolistType = {
        id: v1(),
        title: "new todolist",
        order: 0,
        addedDate: ''
    }
    const action = addTodolistAC(todo);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
