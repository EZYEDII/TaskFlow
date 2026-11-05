# TaskFlow — Full-Stack Task Management Application

TaskFlow is a full-stack task management application designed to demonstrate modern backend development, REST API design, database management, containerization, and frontend integration.

The project is built with FastAPI, PostgreSQL, SQLAlchemy, Alembic, Docker, and Next.js.

> **Project status:** Backend implemented. Frontend in development.

## Features

### Backend
- RESTful API built with FastAPI
- Complete CRUD operations for tasks
- PostgreSQL database integration
- SQLAlchemy ORM
- Pydantic request and response validation
- Pagination and task filtering
- Database migrations with Alembic
- Automated tests with Pytest
- Health check endpoint

### Infrastructure
- Docker and Docker Compose
- Environment-based configuration
- Separate test database
- Reproducible development environment

### Frontend
- Next.js and React
- TypeScript
- Tailwind CSS
- Responsive dashboard (in development)

## Tech Stack

| Category | Technology |
|---|---|
| Backend | Python 3.11, FastAPI |
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL 17 |
| ORM | SQLAlchemy |
| Migrations | Alembic |
| Validation | Pydantic |
| Testing | Pytest, HTTPX |
| Infrastructure | Docker, Docker Compose |
| Version Control | Git, GitHub |

## Project Structure

```text
TaskFlow/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── database.py
│   │   └── main.py
│   ├── migrations/
│   │   └── versions/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
├── tests/
│   ├── conftest.py
│   └── test_tasks.py
├── .env.example
├── .gitignore
├── .dockerignore
├── alembic.ini
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 20.9+
- Docker Desktop
- Git

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd TaskFlow
```

### 2. Configure environment variables

Create your local `.env` file using `.env.example` as a template.

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Update the database credentials in `.env`.

### 3. Start the backend and database

```bash
docker compose up -d --build
```

Docker Compose starts PostgreSQL, waits for its health check, and starts the backend after applying Alembic migrations.

### 4. Access the API

- API: http://localhost:8000
- Swagger documentation: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## API Endpoints

Base URL: `/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks/` | Create a task |
| GET | `/tasks/` | Retrieve tasks |
| GET | `/tasks/{task_id}` | Retrieve a task |
| PATCH | `/tasks/{task_id}` | Update a task |
| DELETE | `/tasks/{task_id}` | Delete a task |

### Filtering and Pagination

Examples:

```http
GET /api/v1/tasks/?completed=true
GET /api/v1/tasks/?completed=false
GET /api/v1/tasks/?skip=0&limit=10
```

## Database Migrations

Generate a migration:

```bash
alembic revision --autogenerate -m "migration description"
```

Apply migrations:

```bash
alembic upgrade head
```

Check the current revision:

```bash
alembic current
```

## Testing

Create the dedicated test database before running the tests.

```bash
python -m pip install pytest httpx
python -m pytest -v
```

The test suite covers task creation, retrieval, updating, deletion, validation, pagination, and filtering.

## Development Goals

- Complete the responsive frontend dashboard
- Integrate the frontend with the FastAPI backend
- Improve automated test coverage
- Add CI/CD with GitHub Actions
- Deploy the complete application

## Learning Objectives

This project is intended to demonstrate practical experience with:

- Python backend development
- REST API architecture
- Relational database design
- ORM and database migrations
- Automated testing
- Containerization
- Full-stack application development
- Version control and collaborative development

## Author

**Ikram Ezrayedi**

GitHub: [EZYEDII](https://github.com/EZYEDII)

---

*TaskFlow is an educational portfolio project developed to strengthen practical software engineering skills.*