import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";

export type FilteredType = 'all'|'active'|'completed'

function App() {
    const [tasks,setTasks]=useState([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'java', isDone: true},
        {id: 3, title: 'Bootstrap', isDone: false},
        {id: 4, title: 'java', isDone: false},
        {id: 5, title: 'CSS', isDone: true},
        {id: 6, title: 'java', isDone: false},
    ])
    const [filter,setFilter]=useState<FilteredType>('all')

    function deleteTask (id:number){
        debugger
       let filteredTasks =  tasks.filter(t=> t.id !== id)
        setTasks(filteredTasks)
        console.log(tasks)
    }

    let tasksForTodolist = tasks;
    if(filter === 'completed'){
        tasksForTodolist = tasks.filter(ac=>ac.isDone)
    }
    if(filter === 'active'){
        tasksForTodolist = tasks.filter(ac=>!ac.isDone)
    }
    function changeFilter(value:FilteredType){
        setFilter(value)
    }

    return (
        <div className="App">

            <Todolist title={'What to learn'}
                      task={tasksForTodolist}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}

            />
        </div>
    );
}

export default App;
