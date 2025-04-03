from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class Mission(db.Model, SerializerMixin):
    __tablename__ = 'missions'

    # Define the columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date, nullable=False)
    image = db.Column(db.String(200), nullable=False)
    crew = db.Column(db.String(200), nullable=False)
    space_shuttle = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    isFavorite = db.Column(db.Boolean, default=False)
    temp_column = db.Column(db.String(50), nullable=True)  # Temporary column

    missions_astronauts = db.relationship('MissionsAstronauts', back_populates='mission', cascade='all, delete-orphan')
    astronauts = association_proxy('missions_astronauts', 'astronaut')

    

class Astronaut(db.Model, SerializerMixin):
    __tablename__ = 'astronauts'

    # Define the columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    isInService = db.Column(db.Boolean, default=True)

    missions_astronauts = db.relationship('MissionsAstronauts', back_populates='astronaut', cascade='all, delete-orphan')
    missions = association_proxy('missions_astronauts', 'mission')

    

class MissionsAstronauts(db.Model, SerializerMixin):
    __tablename__ = 'missions_astronauts'

    # Define the columns
    id = db.Column(db.Integer, primary_key=True)
    mission_id = db.Column(db.Integer, db.ForeignKey('missions.id'), nullable=False)
    astronaut_id = db.Column(db.Integer, db.ForeignKey('astronauts.id'), nullable=False)

    # Define relationships
    mission = db.relationship('Mission', back_populates='missions_astronauts')
    astronaut = db.relationship('Astronaut', back_populates='missions_astronauts')

    