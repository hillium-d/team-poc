const express = require('express');

const app = express();
app.use(express.json());

// In-memory store, good enough for a proof of concept.
const tasks = [{ id: 1, title: 'Set up the team workflow', done: true }];

// Render uses this to decide whether a new deploy is healthy.
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.APP_ENV || 'development',
    version: process.env.RENDER_GIT_COMMIT
      ? process.env.RENDER_GIT_COMMIT.slice(0, 7)
      : 'local',
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Team POC is running', docs: '/tasks' });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }
  const task = { id: tasks.length + 1, title, done: false };
  tasks.push(task);
  return res.status(201).json(task);
});

module.exports = app;
