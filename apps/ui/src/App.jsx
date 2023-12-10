import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddTaskForm from './components/AddTaskForm';
import Task from './components/Task';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from './utils';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/tasks`)
      setTasks(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <AddTaskForm fetchTasks={fetchTasks} />
        { tasks.map(task => <Task key={task.id} task={task} fetchTasks={fetchTasks} />) }
      </main>
    </ThemeProvider>
  );
}
