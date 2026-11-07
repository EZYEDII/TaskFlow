
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict


class NotificationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    task_id: int | None = None

    event_key: str
    type: Literal["overdue", "due_today", "upcoming", "completed"]

    title: str
    message: str
    is_read: bool
    created_at: datetime


class NotificationReadUpdate(BaseModel):
    is_read: bool
