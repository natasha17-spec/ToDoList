import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {FilteredType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    task: TaskType[]
    deleteTask: (id: string) => void
    changeFilter: (value: FilteredType) => void
    addNewTask: () => void
    addTask: string
    setTask: (addTask: string) => void
    onKeyPressEnter: (e: any) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    err: boolean
    setErr:(err: boolean)=>void
    filter:FilteredType
}

function Todolist(props: PropsType) {

let changeHandler=(e:any)=>{
    if(e.target.value !== ''){
        props.setErr(false)
    }
    props.setTask(e.target.value)
}
let filterAll = props.filter === 'all'? 'color':''
let filterActive = props.filter === 'active'? 'color':''
let filterCompleted = props.filter === 'completed'? 'color':''
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={props.addTask}
                       onChange={changeHandler}
                       onKeyPress={(e => props.onKeyPressEnter(e))}
                       className={props.err ? 'error':''}
                />

                <button onClick={props.addNewTask}>+</button>
                {props.err ? "Поле не может быть пустым" : ''}
            </div>
            <ul>
                {props.task.map((el) => {
                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(el.id, e.currentTarget.checked)

                        console.log(e.currentTarget.checked)
                    }
                    return <li key={el.id}  className={el.isDone ?'is-done':''}>
                        <input type="checkbox"
                               checked={el.isDone}
                               onChange={changeStatus}


                        />

                        <span>{el.title}</span>
                        <button onClick={() => {
                            props.deleteTask(el.id)
                        }}>X
                        </button>
                    </li>
                })}
            </ul>
            <div>
                <button className={filterAll} onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button className={filterActive} onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button className={filterCompleted} onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;
