# Fitness Tracker App

A simple, browser-based fitness tracking application built with **React**, **Node.js**, and **Docker Compose**.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running with Docker Compose](#running-with-docker-compose)
  - [Running Locally (without Docker)](#running-locally-without-docker)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Architecture](#architecture)
- [Contributing](#contributing)

---

## Overview

Fitness Tracker is a lightweight web application that lets you log, view, and delete workout entries directly in your browser. Data is stored in-memory on the backend (no database required), making it easy to spin up and run anywhere Docker is available.

---

## Features

- Add workout entries (exercise name, sets, reps, date)
- View all logged workouts in a table
- Delete individual workout entries
- Clean, responsive UI
- Fully containerized with Docker Compose

---

## Tech Stack

| Layer     | Technology          |
|-----------|---------------------|
| Frontend  | React 18, Nginx     |
| Backend   | Node.js 18, Express |
| Container | Docker, Docker Compose |

---

## Project Structure

```
fitness-app-devin/
├── docker-compose.yml        # Orchestrates frontend + backend containers
├── README.md
├── docs/
│   ├── architecture.md       # System architecture overview
│   └── api.md                # REST API reference
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js              # Express API server
└── frontend/
    ├── Dockerfile            # Multi-stage: React build + Nginx serve
    ├── nginx.conf
    ├── package.json
    └── src/
        ├── index.js
        ├── App.js            # Main React component
        └── App.css
```

---

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Running with Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/lorie-castillano/fitness-app-devin.git
   cd fitness-app-devin
   ```

2. Build and start the containers:
   ```bash
   docker compose up --build
   ```

3. Open your browser:
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5001

4. To stop the app:
   ```bash
   docker compose down
   ```

### Running Locally (without Docker)

**Backend:**
```bash
cd backend
npm install
node index.js
# Runs on http://localhost:5001
```

**Frontend:**
```bash
cd frontend
npm install
REACT_APP_API_URL=http://localhost:5001 npm start
# Runs on http://localhost:3000
```

---

## Usage

1. Open **http://localhost:3000** in your browser.
2. Fill in the **Add Workout** form:
   - Exercise name (e.g. Push-ups)
   - Number of sets
   - Number of reps
   - Date
3. Click **Add** to save the workout.
4. View all workouts in the **Workout Log** table.
5. Click **Delete** on any row to remove it.

---

## API Reference

See [docs/api.md](docs/api.md) for the full REST API reference.

---

## Architecture

See [docs/architecture.md](docs/architecture.md) for the system architecture overview.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request
