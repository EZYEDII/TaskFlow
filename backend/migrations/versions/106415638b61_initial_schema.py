"""Initial database schema."""

from alembic import op
import sqlalchemy as sa

revision = "106415638b61"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "tasks",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("title", sa.String(length=100), nullable=False),
        sa.Column("description", sa.String(length=500), nullable=True),
        sa.Column(
            "completed",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false()
        ),
    )

    op.create_index(
        "ix_tasks_id",
        "tasks",
        ["id"],
        unique=False
    )


def downgrade() -> None:
    op.drop_index("ix_tasks_id", table_name="tasks")
    op.drop_table("tasks")