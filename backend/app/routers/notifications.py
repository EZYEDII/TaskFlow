
from datetime import date, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task
from app.models.notification import Notification
from app.models.user import User
from app.schemas.notification import NotificationResponse
from app.dependencies.auth import get_current_user


router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


def generate_deadline_notifications(
    db: Session,
    user_id: int,
):
    today = date.today()
    upcoming_limit = today + timedelta(days=3)

    tasks = db.query(Task).filter(
        Task.user_id == user_id,
        Task.completed.is_(False),
        Task.due_date.isnot(None),
    ).all()

    for task in tasks:

        if task.due_date < today:
            notification_type = "overdue"
            title = "Task overdue"
            message = f"{task.title} is overdue."

        elif task.due_date == today:
            notification_type = "due_today"
            title = "Due today"
            message = f"{task.title} must be completed today."

        elif task.due_date <= upcoming_limit:
            notification_type = "upcoming"
            title = "Upcoming deadline"
            message = f"{task.title} is approaching its deadline."

        else:
            continue

        event_key = (
            f"task:{task.id}:{notification_type}:{task.due_date}"
        )

        exists = db.query(Notification.id).filter(
            Notification.user_id == user_id,
            Notification.event_key == event_key,
        ).first()

        if not exists:
            db.add(
                Notification(
                    user_id=user_id,
                    task_id=task.id,
                    event_key=event_key,
                    type=notification_type,
                    title=title,
                    message=message,
                )
            )

    db.commit()


@router.get("/", response_model=list[NotificationResponse])
def get_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    generate_deadline_notifications(db, current_user.id)

    return (
        db.query(Notification)
        .filter(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .limit(100)
        .all()
    )


@router.get("/unread-count")
def get_unread_count(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    generate_deadline_notifications(db, current_user.id)

    count = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read.is_(False),
    ).count()

    return {"count": count}


@router.patch("/{notification_id}/read")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id,
    ).first()

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    notification.is_read = True
    db.commit()

    return {"message": "Notification marked as read"}


@router.patch("/read-all")
def mark_all_as_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read.is_(False),
    ).update(
        {"is_read": True},
        synchronize_session=False,
    )

    db.commit()

    return {"message": "All notifications marked as read"}
