"""Initial migration

Revision ID: 4a8b7cad6974
Revises: 
Create Date: 2025-04-02 20:40:43.613083

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4a8b7cad6974'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('astronauts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('country', sa.String(length=50), nullable=False),
    sa.Column('isInService', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('missions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('image', sa.String(length=200), nullable=False),
    sa.Column('crew', sa.String(length=200), nullable=False),
    sa.Column('space_shuttle', sa.String(length=50), nullable=False),
    sa.Column('country', sa.String(length=50), nullable=False),
    sa.Column('isFavorite', sa.Boolean(), nullable=True),
    sa.Column('temp_column', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('missions_astronauts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mission_id', sa.Integer(), nullable=False),
    sa.Column('astronaut_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['astronaut_id'], ['astronauts.id'], name=op.f('fk_missions_astronauts_astronaut_id_astronauts')),
    sa.ForeignKeyConstraint(['mission_id'], ['missions.id'], name=op.f('fk_missions_astronauts_mission_id_missions')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('missions_astronauts')
    op.drop_table('missions')
    op.drop_table('astronauts')
    # ### end Alembic commands ###
