import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {AddTodolist, ChangeFilter, ChangeTitle, RemoveTodolist} from "./state/todolistsReducer";
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TasksType = {
	id:string,
	title:string,
	isDone:boolean
}

export type TodolistsType = {
	id:string
	title:string
	filter:FilterValuesType
}

export type TasksStateType = {
	[key: string ]:TasksType[]
}

function App() {

	const dispatch = useDispatch()
	const todolists = useSelector<AppRootState,TodolistsType[]>(state => state.todolists)
	const tasks = useSelector<AppRootState,TasksStateType>(state => state.tasks)


	const changeTitle = useCallback((id:string, title:string) => {
		dispatch(ChangeTitle(id, title))
	},[dispatch])

	const changeTask = useCallback((todolistID:string,id:string, title:string) => {
		dispatch(ChangeTaskTitle(todolistID, title, id))
	}, [dispatch])

	const removeTodolist = useCallback((id: string) => {
		let action = RemoveTodolist(id)
		dispatch(action)
	},[dispatch])

	const removeTask = useCallback((id: string, todolistId: string) => {
		dispatch(RemoveTask(todolistId, id))
	}, [dispatch])

	const addTask = useCallback((title: string, todolistId: string) => {
		dispatch(AddTask(todolistId, title))
	}, [dispatch])

	const addTodolist = useCallback((title:string) => {
		let action = AddTodolist(title)
		dispatch(action)
	}, [dispatch])

	const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
		dispatch(ChangeTaskStatus(todolistId, isDone, taskId))
	}, [dispatch])

	const changeFilter = useCallback((value: FilterValuesType, id: string) => {
		dispatch(ChangeFilter(id, value))
	},[dispatch])

	return (
		<div className="App">
			<ButtonAppBar/>
			<Container fixed >
				<Grid container  style={{padding: "20px"}}>
					<AddItemForm callBackAddTask={addTodolist} />
				</Grid>
				<Grid container spacing={3}>
					{todolists.map(tl => {

						let tasksForTodolist = tasks[tl.id];

						if (tl.filter === "active") {
							tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
						}
						if (tl.filter === "completed") {
							tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
						}

						return <Grid item>
							<Paper elevation={4} style={{padding: "10px"}}>
							<Todolist
								key={tl.id}
								id={tl.id}
								title={tl.title}
								tasks={tasksForTodolist}
								removeTask={removeTask}
								changeFilter={changeFilter}
								addTask={addTask}
								changeTaskStatus={changeStatus}
								filter={tl.filter}
								removeTodolist={removeTodolist}
								changeTask={changeTask}
								changeTitle={changeTitle}
							/>
							</Paper>
						</Grid>
					})}
				</Grid>
			</Container>
		</div>
	);
}

export default App;
