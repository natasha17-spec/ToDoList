import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from '../Todolist';
import {AddItemForm} from '../AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    changeTodolistFilterAC,
    fetchChangeTodolistTittle,
    fetchCreateTodolist,
    fetchRemoveTodolistTodolists,
    fetchTodolistsThunk,
    FilterValuesType,
    TodolistDomainType
} from '../state/todolist/todolists-reducer'
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from '../state/Task/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {TaskStatuses, TaskType} from '../api/todolists-api'
import LinearIndeterminate from '../helpers/Preloder';
import Snackbar from '../helpers/SnackBar'
import ErrorHelpers from '../helpers/SnackBar';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    debugger
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsThunk())
    }, [])


    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId));
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {
        debugger
        // const action = addTaskAC(title, todolistId);
        dispatch(addTaskTC(title, todolistId));
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        debugger
        dispatch(changeTaskStatusTC(id, status, todolistId));
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        debugger
        dispatch(changeTaskTitleTC(id, newTitle, todolistId));
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(fetchRemoveTodolistTodolists(id))
    }, [dispatch]);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        debugger
        // const action = changeTodolistTitleAC(id, title);
        dispatch(fetchChangeTodolistTittle(id, title));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {

        dispatch(fetchCreateTodolist(title));
    }, [dispatch]);

    return (
        <div className="App">
            <Snackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <LinearIndeterminate/>
            <ErrorHelpers/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
