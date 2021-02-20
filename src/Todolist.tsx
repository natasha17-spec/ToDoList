import React from 'react';
import './App.css';

type Task1Type = {
    id:number
    title:string
    isDone:boolean
}

type PropsType = {
    title:string
    task:Task1Type[]
}

function Todolist(props:PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map((el)=>(
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                ))}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
