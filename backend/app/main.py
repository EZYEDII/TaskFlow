from fastapi import FastAPI
from app.routers.tasks import router as tasks_router
from fastapi.middleware.cors import CORSMiddleware
from app.routers.notifications import router as notifications_router

app = FastAPI(
    title="TaskFlow API",
    description="A task management application API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    notifications_router,
    prefix="/api/v1"
)

app.include_router(tasks_router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {
        "message": "Welcome to TaskFlow API!",
        "status": "running"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}