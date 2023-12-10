/* eslint-disable react/prop-types */
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import UpdateTaskForm from "./UpdateTaskForm";
import classnames from "classnames";
import axios from "axios";
import { API_BASE_URL } from "../utils";

function Task({ task, fetchTasks }) {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(`${API_BASE_URL}/task`, {
        id,
        name,
        completed: !isComplete,
      });
      setIsComplete(!isComplete);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/task/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="task">
      <div className={classnames({
        'flex': true,
        done: isComplete
      })}>
        <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="container" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
        fetchTasks={fetchTasks}
      />
    </div>
  );
}

export default Task;
