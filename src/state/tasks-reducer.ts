import {TasksStateType} from "../App";


type ActionType = {
    type: string
    [key: string]: any
}


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {


        default :
            throw new Error("I don't understand that this action type")
    }

}