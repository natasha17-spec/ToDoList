import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";


export type FilteredType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'java', isDone: true},
        {id: v1(), title: 'Bootstrap', isDone: false},
        {id: v1(), title: 'java', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'java', isDone: false},
    ])
    const [filter, setFilter] = useState<FilteredType>('all')
    const [addTask, setTask] = useState('')

    let tasksForTodolist = tasks;

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(ac => ac.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(ac => !ac.isDone)
    }
    
    function deleteTask(id: string) {
        debugger
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
        console.log(tasks)
    }

    function changeFilter(value: FilteredType) {
        setFilter(value)
    }

    function addNewTask() {
        let newTask= {
            id: v1(),
            title: addTask,
            isDone: false
        }
        let newTasks = [newTask,...tasks]
        setTasks(newTasks)
        setTask('')

    }
    
    function onKeyPressEnter(e:any) {
        if(e.charCode === 13){
            addNewTask()
        }
    }

    return (
        <div className="App">

            <Todolist title={'What to learn'}
                      task={tasksForTodolist}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      addNewTask={addNewTask}
                      onKeyPressEnter={onKeyPressEnter}
                      addTask={addTask}
                      setTask={setTask}

            />
        </div>
    );
}

export default App;
