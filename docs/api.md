# API Reference

The backend exposes a simple REST API under the `/api` prefix.

**Base URL:** `http://localhost:5001`

---

## Endpoints

### GET /api/workouts

Returns all workout entries.

**Request**
```
GET /api/workouts
```

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "exercise": "Push-ups",
    "sets": 3,
    "reps": 15,
    "date": "2026-05-30"
  },
  {
    "id": 2,
    "exercise": "Squats",
    "sets": 4,
    "reps": 12,
    "date": "2026-05-31"
  }
]
```

---

### POST /api/workouts

Creates a new workout entry.

**Request**
```
POST /api/workouts
Content-Type: application/json
```

**Request Body**

| Field      | Type   | Required | Description                        |
|------------|--------|----------|------------------------------------|
| `exercise` | string | Yes      | Name of the exercise (e.g. Squats) |
| `sets`     | number | Yes      | Number of sets                     |
| `reps`     | number | Yes      | Number of repetitions per set      |
| `date`     | string | Yes      | Date in `YYYY-MM-DD` format        |

**Example Request Body**
```json
{
  "exercise": "Deadlift",
  "sets": 3,
  "reps": 8,
  "date": "2026-06-01"
}
```

**Response `201 Created`**
```json
{
  "id": 3,
  "exercise": "Deadlift",
  "sets": 3,
  "reps": 8,
  "date": "2026-06-01"
}
```

**Response `400 Bad Request`** (missing fields)
```json
{
  "error": "All fields are required"
}
```

---

### DELETE /api/workouts/:id

Deletes a workout entry by its ID.

**Request**
```
DELETE /api/workouts/3
```

**Path Parameters**

| Parameter | Type   | Description                  |
|-----------|--------|------------------------------|
| `id`      | number | ID of the workout to delete  |

**Response `200 OK`**
```json
{
  "message": "Deleted"
}
```

**Response `404 Not Found`** (ID does not exist)
```json
{
  "error": "Workout not found"
}
```

---

## Workout Object

| Field      | Type   | Description                        |
|------------|--------|------------------------------------|
| `id`       | number | Auto-incremented unique identifier |
| `exercise` | string | Name of the exercise               |
| `sets`     | number | Number of sets                     |
| `reps`     | number | Number of reps per set             |
| `date`     | string | Date in `YYYY-MM-DD` format        |

---

## Error Responses

| Status | Meaning                              |
|--------|--------------------------------------|
| `400`  | Bad request — missing required fields |
| `404`  | Resource not found                   |

---

## Example: cURL

**Get all workouts**
```bash
curl http://localhost:5001/api/workouts
```

**Add a workout**
```bash
curl -X POST http://localhost:5001/api/workouts \
  -H "Content-Type: application/json" \
  -d '{"exercise":"Bench Press","sets":4,"reps":10,"date":"2026-06-01"}'
```

**Delete a workout**
```bash
curl -X DELETE http://localhost:5001/api/workouts/1
```
