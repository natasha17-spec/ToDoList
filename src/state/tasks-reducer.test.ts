import {todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {TasksStateType, TodolistType} from '../App';
import {tasksReducer} from "./tasks-reducer";

test('task should be remove', () => {
    //
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const startState: TasksStateType = {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // }
    // const endState = tasksReducer(startState, { type: 'REMOVE-TASK', todoId: todolistId1, taskId:[todolistId2][0]})
    // expect(endState[todolistId2].length).toBe("HTML&CSS");
    // expect(endState[0].id).toBe(todolistId2);
});

