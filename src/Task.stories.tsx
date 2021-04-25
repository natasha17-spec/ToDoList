import {Task} from './Task';
import React from 'react';
import {action} from '@storybook/addon-actions';


export default {
    title:'addNewTask',
    component:Task
}
const changeTaskStatusCallback = action('StatusChanged');
const changeTaskTitleCallback = action('TitleChanged');
const changeTaskRemovedCallback = action('RemovedTasks');

export const AddTaskForExample = (props:any) =>{
    return (
            <>
                <Task
                    task={{id:'1', isDone:false, title:'CSS'}}
                    todolistId={'todolistId1'}
                    changeTaskStatus={changeTaskStatusCallback}
                    changeTaskTitle={changeTaskTitleCallback}
                    removeTask={changeTaskRemovedCallback}/>
                <Task
                    task={{id:'1', isDone:true, title:'JS'}}
                    todolistId={'todolistId2'}
                    changeTaskStatus={changeTaskStatusCallback}
                    changeTaskTitle={changeTaskTitleCallback}
                    removeTask={changeTaskRemovedCallback}/>
            </>
        )

}
