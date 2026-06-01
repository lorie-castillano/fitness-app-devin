const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// In-memory store for workouts
let workouts = [
  { id: 1, exercise: 'Push-ups', sets: 3, reps: 15, date: '2026-05-30' },
  { id: 2, exercise: 'Squats', sets: 4, reps: 12, date: '2026-05-31' },
];
let nextId = 3;

// Get all workouts
app.get('/api/workouts', (req, res) => {
  res.json(workouts);
});

// Add a workout
app.post('/api/workouts', (req, res) => {
  const { exercise, sets, reps, date } = req.body;
  if (!exercise || !sets || !reps || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const workout = { id: nextId++, exercise, sets: Number(sets), reps: Number(reps), date };
  workouts.push(workout);
  res.status(201).json(workout);
});

// Delete a workout
app.delete('/api/workouts/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = workouts.findIndex(w => w.id === id);
  if (index === -1) return res.status(404).json({ error: 'Workout not found' });
  workouts.splice(index, 1);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
