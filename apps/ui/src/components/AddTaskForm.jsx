/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { API_BASE_URL } from '../utils';

export default function AddTaskForm({ fetchTasks }) {
  const [newTask, setNewTask] = useState('')

  const addNewTask = async () => {
    try {
      await axios.post(`${API_BASE_URL}/task`,
      { 
        name: newTask,
        completed: false
      })
      await fetchTasks()
      setNewTask('')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Typography align='center' variant='h2' paddingTop={2} paddingBottom={2}>
        My Super Task List
      </Typography>
      <div className="addTaskForm">
        <TextField variant='outlined' size='small' label="Task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <Button variant="outlined" disabled={!newTask.length} onClick={addNewTask}>
          <AddIcon />
        </Button>
      </div>
    </div>
  )
}
