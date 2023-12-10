import express from 'express';
import { fetchTasks, createTask, updateTask, deleteTask } from './handlers/task.js'
import serverless from 'serverless-http';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await fetchTasks();
    res.send(tasks.Items)
  } catch (err) {
    res.status(400).send(`Error fetching tasks: ${err}`);
  }
})

app.post('/task', async (req, res) => {
  try {
    const response = await createTask(req.body);
    res.send(response)
  } catch (err) {
    res.status(400).send(`Error creating task: ${err}`);
  }
})

app.put('/task', async (req, res) => {
  try {
    const response = await updateTask(req.body);
    res.send(response)
  } catch (err) {
    res.status(400).send(`Error updating task: ${err}`);
  }
})

app.delete('/task/:id', async (req, res) => {
  try {
    const response = await deleteTask(req.params.id);
    res.send(response)
  } catch (err) {
    res.status(400).send(`Error deleting task: ${err}`);
  }
})

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`app listening to port ${port}`)
  })
}

export const handler = serverless(app);