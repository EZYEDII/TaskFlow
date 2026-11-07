
"""secure notifications per user

Revision ID: 8a81b476bb8e
Revises: ba55f5fddccd
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "8a81b476bb8e"
down_revision: Union[str, Sequence[str], None] = "ba55f5fddccd"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # 1. Add user_id temporarily as nullable.
    op.add_column(
        "notifications",
        sa.Column("user_id", sa.Integer(), nullable=True),
    )

    # 2. Associate existing notifications with their task owner.
    op.execute("""
        UPDATE notifications AS n
        SET user_id = t.user_id
        FROM tasks AS t
        WHERE n.task_id = t.id
          AND t.user_id IS NOT NULL
    """)

    # 3. Remove notifications without a valid owner.
    op.execute("""
        DELETE FROM notifications
        WHERE user_id IS NULL
    """)

    # 4. Make user_id mandatory.
    op.alter_column(
        "notifications",
        "user_id",
        existing_type=sa.Integer(),
        nullable=False,
    )

    # 5. Replace the global unique constraint.
    op.drop_constraint(
        "notifications_event_key_key",
        "notifications",
        type_="unique",
    )

    # 6. Add user-specific uniqueness.
    op.create_unique_constraint(
        "uq_notification_user_event",
        "notifications",
        ["user_id", "event_key"],
    )

    # 7. Add index and foreign key.
    op.create_index(
        "ix_notifications_user_id",
        "notifications",
        ["user_id"],
        unique=False,
    )

    op.create_foreign_key(
        "fk_notifications_user_id_users",
        "notifications",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )


def downgrade() -> None:
    op.drop_constraint(
        "fk_notifications_user_id_users",
        "notifications",
        type_="foreignkey",
    )

    op.drop_constraint(
        "uq_notification_user_event",
        "notifications",
        type_="unique",
    )

    op.drop_index(
        "ix_notifications_user_id",
        table_name="notifications",
    )

    op.create_unique_constraint(
        "notifications_event_key_key",
        "notifications",
        ["event_key"],
    )

    op.drop_column("notifications", "user_id")
