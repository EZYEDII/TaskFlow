
"""make task owner required

Revision ID: dac489a4db00
Revises: 8a81b476bb8e
"""

from alembic import op
import sqlalchemy as sa


revision = "dac489a4db00"
down_revision = "8a81b476bb8e"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Ensure every task has an owner before enforcing NOT NULL.
    op.alter_column(
        "tasks",
        "user_id",
        existing_type=sa.Integer(),
        nullable=False,
    )

    # Add an index to optimize filtering tasks by user.
    op.create_index(
        "ix_tasks_user_id",
        "tasks",
        ["user_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_tasks_user_id",
        table_name="tasks",
    )

    op.alter_column(
        "tasks",
        "user_id",
        existing_type=sa.Integer(),
        nullable=True,
    )
