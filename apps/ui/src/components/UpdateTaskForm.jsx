/* eslint-disable react/prop-types */

import { Button, DialogTitle, TextField, Dialog } from "@mui/material"
import { useState } from "react"
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_BASE_URL } from "../utils";

export default function UpdateTaskForm({
  isDialogOpen,
  setIsDialogOpen,
  task,
  fetchTasks
}) {
  const { id, completed } = task
  const [taskName, setTaskName] = useState('')

  const handleUpdateTaskName = async () => {
    try {
      await axios.put(`${API_BASE_URL}/task`, {
        id,
        name: taskName,
        completed
      })
      await fetchTasks()
      setTaskName('')
      setIsDialogOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit task</DialogTitle>
      <div className="dialog">
        <TextField size="small" label="Task" variant="outlined" onChange={(e) => setTaskName(e.target.value)} />
        <Button variant="contained" onClick={() => handleUpdateTaskName()}>
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  )
}
