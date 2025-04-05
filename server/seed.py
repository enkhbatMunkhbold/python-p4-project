#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Mission, Astronaut, MissionsAstronauts

def create_missions():
    missions = []
    for _ in range(10):
        mission = Mission(
            name=fake.catch_phrase(),
            date=fake.date_time_this_decade(),
            image_url=fake.image_url(),
            crew=fake.sentence(),
            space_shuttle=fake.catch_phrase(),
            country=fake.country(),
            isFavorite=rc([True, False])
        )
        missions.append(mission)
    db.session.add_all(missions)
    db.session.commit()

def create_astronauts():
    astronauts = []
    for _ in range(15):
        astronaut = Astronaut(
            name=fake.name(),
            country=fake.country(),
            isInService=rc([True, False])
        )
        astronauts.append(astronaut)
    db.session.add_all(astronauts)
    db.session.commit()

def create_missions_astronauts():
    missions_astronauts = []
    mission_ids = [mission.id for mission in Mission.query.all()]
    astronaut_ids = [astronaut.id for astronaut in Astronaut.query.all()]
    for _ in range(30):
        missions_astronauts.append(MissionsAstronauts(
            mission_id=rc(mission_ids),
            astronaut_id=rc(astronaut_ids)
        ))
    db.session.add_all(missions_astronauts)
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        create_missions()
        create_astronauts()
        create_missions_astronauts()
