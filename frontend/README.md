# TaskFlow Frontend

The frontend of **TaskFlow** is a modern, responsive task management interface built with Next.js, React, and TypeScript.

It provides users with an intuitive interface to manage their accounts, organize tasks, monitor productivity, and track task completion through a personalized dashboard.

The frontend communicates with the backend REST API developed using FastAPI.

## Features

### Authentication
- User registration.
- User login.
- Authentication state management.
- Protected application routes.
- Logout functionality.
- Form validation and error handling.

### Dashboard
- Personalized dashboard interface.
- Overview of total, completed, and pending tasks.
- Task completion statistics.
- Overall progress visualization.
- Recent tasks overview.
- Quick task creation.

### Task Management
- Create new tasks.
- View existing tasks.
- Edit task details.
- Delete tasks.
- Mark tasks as completed or pending.
- Task status management.

### Notifications
- Notification interface.
- Notification indicator.
- Notification panel.

### User Interface
- Responsive application layout.
- Sidebar navigation.
- Dashboard header.
- Reusable UI components.
- Custom styling based on the 60-30-10 color distribution.
- Consistent color palette and visual design.
- Responsive layouts for different screen sizes.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js |
| UI Library | React |
| Programming Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Custom Styling | CSS |
| Icons | Lucide React |
| Backend Integration | FastAPI REST API |
| Package Manager | npm |

## Project Structure

The frontend follows a feature-oriented architecture to organize application pages, reusable components, and business logic.

```text
frontend/
├── public/
│
├── src/
│   ├── app/
│   │   ├── (protected)/
│   │   │   ├── dashboard/
│   │   │   ├── tasks/
│   │   │   └── settings/
│   │   │
│   │   ├── login/
│   │   ├── register/
│   │   ├── globals.css
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Sidebar.tsx
│   │
│   └── features/
│       ├── auth/
│       │   ├── components/
│       │   └── hooks/
│       │
│       ├── dashboard/
│       │   └── components/
│       │
│       ├── notifications/
│       │   └── components/
│       │
│       └── tasks/
│           ├── components/
│           ├── hooks/
│           └── types/
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 20.9 or later.
- npm.
- Git.

The FastAPI backend should also be running for full application functionality.

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Configure the backend API URL if required by the frontend configuration.

Use the environment variable name expected by the API service in the project.

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

http://localhost:3000

## Application Pages

| Page | Route | Description |
|---|---|---|
| Login | `/login` | User authentication |
| Registration | `/register` | Account creation |
| Dashboard | `/dashboard` | Productivity overview |
| Tasks | `/tasks` | Task management |
| Settings | `/settings` | Application settings |

## Backend Integration

The frontend communicates with the FastAPI backend through REST API requests.

The integration supports:

- User authentication.
- Account registration.
- Task creation and retrieval.
- Task updates and deletion.
- Task completion management.
- Backend error handling.

The backend API documentation is available through Swagger UI:

http://localhost:8000/docs

## Available Scripts

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run lint` | Run the configured linting script |

## Design System

TaskFlow uses a custom visual identity based on the **60-30-10 color design principle**.

The interface combines three complementary color groups:

- **60% – Dominant color:** Cream and light neutral backgrounds.
- **30% – Secondary color:** Teal elements for navigation and important interface sections.
- **10% – Accent color:** Plum and complementary accent colors for highlights and visual emphasis.

The design aims to provide a clean, consistent, and comfortable user experience.

## Future Improvements

- Advanced task search and filtering.
- Enhanced notification functionality.
- User profile customization.
- Additional dashboard analytics.
- Improved accessibility.
- Frontend automated testing.

## Author

**Ikram Ezrayedi**

GitHub: [EZYEDII](https://github.com/EZYEDII)

---

The TaskFlow frontend is part of a full-stack educational portfolio project developed to demonstrate modern frontend development, backend integration, and practical software engineering skills.