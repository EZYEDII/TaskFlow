
from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)
    completed = Column(Boolean, default=False, nullable=False)

    priority = Column(
        String(10),
        nullable=False,
        default="medium",
        server_default="medium"
    )

    due_date = Column(Date, nullable=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    owner = relationship("User", back_populates="tasks")