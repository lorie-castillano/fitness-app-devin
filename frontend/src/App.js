import React, { useState, useEffect } from 'react';
import './App.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({ exercise: '', sets: '', reps: '', date: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const res = await fetch(`${API}/api/workouts`);
    const data = await res.json();
    setWorkouts(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.exercise || !form.sets || !form.reps || !form.date) {
      setError('Please fill in all fields.');
      return;
    }
    const res = await fetch(`${API}/api/workouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ exercise: '', sets: '', reps: '', date: '' });
      fetchWorkouts();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/api/workouts/${id}`, { method: 'DELETE' });
    fetchWorkouts();
  };

  return (
    <div className="app">
      <header>
        <h1>Fitness Tracker</h1>
        <p>Log and track your workouts</p>
      </header>

      <main>
        <section className="form-section">
          <h2>Add Workout</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                name="exercise"
                placeholder="Exercise (e.g. Push-ups)"
                value={form.exercise}
                onChange={handleChange}
              />
              <input
                name="sets"
                type="number"
                placeholder="Sets"
                min="1"
                value={form.sets}
                onChange={handleChange}
              />
              <input
                name="reps"
                type="number"
                placeholder="Reps"
                min="1"
                value={form.reps}
                onChange={handleChange}
              />
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
              <button type="submit">Add</button>
            </div>
            {error && <p className="error">{error}</p>}
          </form>
        </section>

        <section className="list-section">
          <h2>Workout Log</h2>
          {workouts.length === 0 ? (
            <p className="empty">No workouts yet. Add one above!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((w) => (
                  <tr key={w.id}>
                    <td>{w.exercise}</td>
                    <td>{w.sets}</td>
                    <td>{w.reps}</td>
                    <td>{w.date}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(w.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
