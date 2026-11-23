# TaskFlow — Full-Stack Task Management Application

TaskFlow is a full-stack task management application designed to help users organize their daily activities, manage priorities, and track their productivity.

The project demonstrates practical software engineering skills through REST API development, relational database management, authentication, frontend development, and containerization.

Built with **FastAPI, PostgreSQL, SQLAlchemy, Alembic, Docker, Next.js, React, and TypeScript**.

## Features

### Backend
- RESTful API built with FastAPI.
- User authentication and account management.
- Task management with complete CRUD operations.
- PostgreSQL database integration.
- SQLAlchemy ORM for database operations.
- Pydantic request and response validation.
- Pagination and task filtering.
- Database migrations with Alembic.
- Automated testing with Pytest.
- Health check endpoint.

### Frontend
- Modern interface built with Next.js and React.
- TypeScript for type safety.
- User registration and login pages.
- Authentication state management.
- Protected application routes.
- Responsive dashboard.
- Task creation, editing, deletion, and completion.
- Task statistics and progress tracking.
- Notification interface.
- Custom UI design based on a 60-30-10 color distribution.
- Tailwind CSS and custom CSS styling.

### Infrastructure
- Docker and Docker Compose.
- PostgreSQL containerization.
- Environment-based configuration.
- Database migrations.
- Dedicated test database.
- Git and GitHub version control.

## Tech Stack

| Category | Technology |
|---|---|
| Backend | Python 3.11, FastAPI |
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS 4, Custom CSS |
| Database | PostgreSQL 17 |
| ORM | SQLAlchemy |
| Migrations | Alembic |
| Validation | Pydantic |
| Authentication | JWT / [specify implemented mechanism] |
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
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── tests/
│   ├── conftest.py
│   └── test_tasks.py
│
├── .env.example
├── .gitignore
├── .dockerignore
├── alembic.ini
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Python 3.11+
- Node.js 20.9+
- npm
- Docker Desktop
- Git

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd TaskFlow
```

### 2. Configure environment variables

Create your local `.env` file using `.env.example` as a template.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

On Linux/macOS:

```bash
cp .env.example .env
```

Update the required database credentials, authentication settings, and application configuration.

### 3. Start the backend and database

```bash
docker compose up -d --build
```

Docker Compose starts the PostgreSQL database and backend services according to the configured dependencies.

### 4. Start the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

http://localhost:3000

### 5. Access the application

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Login | http://localhost:3000/login |
| Registration | http://localhost:3000/register |
| Dashboard | http://localhost:3000/dashboard |
| Backend API | http://localhost:8000 |
| Swagger Documentation | http://localhost:8000/docs |
| Health Check | http://localhost:8000/health |

## API Endpoints

Base URL: `/api/v1`

### Task Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks/` | Create a task |
| GET | `/tasks/` | Retrieve tasks |
| GET | `/tasks/{task_id}` | Retrieve a specific task |
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

Generate a new migration:

```bash
alembic revision --autogenerate -m "migration description"
```

Apply migrations:

```bash
alembic upgrade head
```

Check the current database revision:

```bash
alembic current
```

## Testing

Install the testing dependencies if necessary:

```bash
python -m pip install pytest httpx
```

Run the test suite:

```bash
python -m pytest -v
```

The tests cover task management operations, validation, pagination, and filtering.

## Future Improvements

Potential future enhancements include:

- Advanced task filtering and search.
- Enhanced notification functionality.
- User profile management.
- Improved dashboard analytics.
- Continuous Integration and Continuous Deployment (CI/CD) with GitHub Actions.
- Production deployment.

## Learning Objectives

TaskFlow demonstrates practical experience in:

- Full-stack application development.
- Python backend development.
- REST API architecture.
- Authentication and authorization.
- Relational database design.
- ORM and database migrations.
- Frontend development with React and Next.js.
- Responsive UI design.
- Automated software testing.
- Docker-based development environments.
- Git and GitHub version control.

## Author

**Ikram Ezrayedi**

GitHub: [EZYEDII](https://github.com/EZYEDII)

---

TaskFlow is an educational portfolio project developed to strengthen practical software engineering skills and demonstrate full-stack application development.