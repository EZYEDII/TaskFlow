
from datetime import date, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task
from app.models.notification import Notification
from app.schemas.notification import NotificationResponse

router = APIRouter(prefix="/notifications", tags=["Notifications"])


def generate_deadline_notifications(db: Session):
    today = date.today()
    upcoming_limit = today + timedelta(days=3)

    tasks = db.query(Task).filter(
        Task.completed.is_(False),
        Task.due_date.isnot(None)
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
            Notification.event_key == event_key
        ).first()

        if not exists:
            db.add(Notification(
                task_id=task.id,
                event_key=event_key,
                type=notification_type,
                title=title,
                message=message
            ))

    db.commit()


@router.get("/", response_model=list[NotificationResponse])
def get_notifications(db: Session = Depends(get_db)):
    generate_deadline_notifications(db)

    return (
        db.query(Notification)
        .order_by(Notification.created_at.desc())
        .limit(100)
        .all()
    )


@router.get("/unread-count")
def get_unread_count(db: Session = Depends(get_db)):
    generate_deadline_notifications(db)

    count = db.query(Notification).filter(
        Notification.is_read.is_(False)
    ).count()

    return {"count": count}


@router.patch("/{notification_id}/read")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db)
):
    notification = db.query(Notification).filter(
        Notification.id == notification_id
    ).first()

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    notification.is_read = True
    db.commit()

    return {"message": "Notification marked as read"}


@router.patch("/read-all")
def mark_all_as_read(db: Session = Depends(get_db)):
    db.query(Notification).filter(
        Notification.is_read.is_(False)
    ).update({"is_read": True})

    db.commit()

    return {"message": "All notifications marked as read"}
