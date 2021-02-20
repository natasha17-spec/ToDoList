import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {
    let tasks1 = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'java', isDone: true},
        {id: 3, title: 'Bootstrap', isDone: false},
    ]
    let tasks2 = [
        {id: 1, title: 'Cup', isDone: true},
        {id: 2, title: 'Book', isDone: false},
        {id: 3, title: 'Tea', isDone: true},
    ]
    return (
        <div className="App">

            <Todolist title={'What to learn'} task={tasks1}/>
            <Todolist title={'What to buy'} task={tasks2}/>
        </div>
    );
}

export default App;
