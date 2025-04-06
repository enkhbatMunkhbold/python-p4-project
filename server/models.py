from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import JSON

from config import db


# Models go here!
class Mission(db.Model, SerializerMixin):
    __tablename__ = 'missions'

    # Define the columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    crew = db.Column(JSON, nullable=False)
    space_shuttle = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    isFavorite = db.Column(db.Boolean, default=False)

    missions_astronauts = db.relationship('MissionsAstronauts', back_populates='mission', cascade='all, delete-orphan')
    astronauts = association_proxy('missions_astronauts', 'astronaut')

    serialize_rules = ('-missions_astronauts.mission',)

    def validate_non_empty_string(self, key, value, max_length):
        if not value or len(value.strip()) == 0:
            raise ValueError(f"{key} cannot be empty.")
        if len(value) > max_length:
            raise ValueError(f"{key} must be {max_length} characters or less.")
        return value

    @validates('name', 'space_shuttle', 'country')
    def validate_common_fields(self, key, value):
        return self.validate_non_empty_string(key, value, 50)

    @validates('date')
    def validate_date(self, _, value):
        from datetime import date
        if value > date.today():
            raise ValueError("Mission date cannot be in the future.")
        return value
    
    @validates('image_url')
    def validate_image_url(self, _, value):
        if not value.startswith(("http://", "https://")):
            raise ValueError("Image URL must start with 'http://' or 'https://'.")
        if len(value) > 200:
            raise ValueError("Image URL must be 200 characters or less.")
        return value
    
    @validates('crew')
    def validate_crew(self, _, value):
        if not value or len(value) == 0:
            raise ValueError("Crew information cannot be empty.")
        if not isinstance(value, list):
            raise ValueError("Crew must be a list of strings.")
        return value
    
    def __repr__(self):
        return f"<Mission {self.id}: {self.name}>"
    

class Astronaut(db.Model, SerializerMixin):
    __tablename__ = 'astronauts'

    # Define the columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    isInService = db.Column(db.Boolean, default=True)

    missions_astronauts = db.relationship('MissionsAstronauts', back_populates='astronaut', cascade='all, delete-orphan')
    missions = association_proxy('missions_astronauts', 'mission')

    serialize_rules = ('-missions_astronauts.astronaut',)

    def validate_non_empty_string(self, key, value, max_length):
        if not value or len(value.strip()) == 0:
            raise ValueError(f"{key} cannot be empty.")
        if len(value) > max_length:
            raise ValueError(f"{key} must be {max_length} characters or less.")
        return value

    @validates('name', 'country')
    def validate_common_fields(self, key, value):
        return self.validate_non_empty_string(key, value, 50)
    
    @validates('isInService')
    def validate_is_in_service(self, _, value):
        if not isinstance(value, bool):
            raise ValueError("isInService must be a boolean value.")
        return value
    
    def __repr__(self):
        return f"<Astronaut {self.id}: {self.name}>"
    

class MissionsAstronauts(db.Model, SerializerMixin):
    __tablename__ = 'missions_astronauts'

    # Define the columns
    id = db.Column(db.Integer, primary_key=True)
    mission_id = db.Column(db.Integer, db.ForeignKey('missions.id'), nullable=False)
    astronaut_id = db.Column(db.Integer, db.ForeignKey('astronauts.id'), nullable=False)

    # Define relationships
    mission = db.relationship('Mission', back_populates='missions_astronauts')
    astronaut = db.relationship('Astronaut', back_populates='missions_astronauts')

    serialize_rules = ('-mission.missions_astronauts', '-astronaut.missions_astronauts')

    def __repr__(self):
        return f"<MissionsAstronauts {self.id}: Mission {self.mission_id} - Astronaut {self.astronaut_id}>"