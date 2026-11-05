from pydantic import BaseModel, Field, ConfigDict


class TaskCreate(BaseModel):
    title: str = Field(
        min_length=3,
        max_length=100,
        description="The title of the task"
    )
    description: str | None = Field(
        default=None,
        max_length=500,
        description="The description of the task"
    )


class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str | None = None
    completed: bool


class TaskUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        min_length=3,
        max_length=100
    )
    description: str | None = Field(
        default=None,
        max_length=500
    )
    completed: bool | None = None