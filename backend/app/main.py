from fastapi import FastAPI
from app.routers.tasks import router as tasks_router

app = FastAPI(
    title="TaskFlow API",
    description="A task management application API",
    version="1.0.0"
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