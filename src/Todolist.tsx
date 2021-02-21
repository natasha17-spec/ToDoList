import React, {useState} from 'react';
import './App.css';
import {FilteredType} from "./App";

type TaskType = {
    id:string
    title:string
    isDone:boolean
}

type PropsType = {
    title:string
    task:TaskType[]
    deleteTask:(id:string)=>void
    changeFilter:(value:FilteredType)=>void
    addNewTask:()=>void
    addTask:string
    setTask:(addTask:string)=>void
    onKeyPressEnter:(e:any)=>void

}

function Todolist(props:PropsType) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={props.addTask}
                       onChange={e=>props.setTask(e.target.value)}
                onKeyPress={(e)=>{
                    props.onKeyPressEnter(e)
                }}
                />
                <button onClick={props.addNewTask}>+</button>
            </div>
            <ul>
                {props.task.map((el)=>(
                    <li key={el.id}>
                        <input type="checkbox"
                               checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={()=>{props.deleteTask(el.id)}}>X</button>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
