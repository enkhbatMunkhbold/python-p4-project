#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, date

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Mission, Astronaut, MissionsAstronauts

def create_missions():
    missions = []
    astronauts = []  # Collect all astronauts created for missions

    # Apollo 11 Mission
    apollo_11_crew = [
        Astronaut(name="Neil Armstrong", country="USA", isInService=False),
        Astronaut(name="Buzz Aldrin", country="USA", isInService=False),
        Astronaut(name="Michael Collins", country="USA", isInService=False)
    ]
    astronauts.extend(apollo_11_crew)
    
    apollo_11 = Mission(
        name="Apollo 11",
        date=date(1969, 7, 16),
        image_url="https://www.nasa.gov/sites/default/files/thumbnails/image/apollo11_crew.jpg",
        crew=[astronaut.name for astronaut in apollo_11_crew],
        space_shuttle="Saturn V",
        country="USA",
        isFavorite=True
    )
    missions.append(apollo_11)

    # Soyuz 11 Mission
    soyuz_11_crew = [
        Astronaut(name="Georgy Dobrovolsky", country="USSR", isInService=False),
        Astronaut(name="Viktor Patsayev", country="USSR", isInService=False),
        Astronaut(name="Vladislav Volkov", country="USSR", isInService=False)
    ]
    astronauts.extend(soyuz_11_crew)
    
    soyuz_11 = Mission(
        name="Soyuz 11",
        date=date(1971, 6, 6),
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Soyuz_11_crew.jpg/800px-Soyuz_11_crew.jpg",
        crew=[astronaut.name for astronaut in soyuz_11_crew],
        space_shuttle="Soyuz 7K-OKS",
        country="USSR",
        isFavorite=True
    )
    missions.append(soyuz_11)

    # STS-51-L (Challenger)
    challenger_crew = [
        Astronaut(name="Francis Scobee", country="USA", isInService=False),
        Astronaut(name="Michael Smith", country="USA", isInService=False),
        Astronaut(name="Judith Resnik", country="USA", isInService=False),
        Astronaut(name="Ellison Onizuka", country="USA", isInService=False),
        Astronaut(name="Ronald McNair", country="USA", isInService=False),
        Astronaut(name="Gregory Jarvis", country="USA", isInService=False),
        Astronaut(name="Christa McAuliffe", country="USA", isInService=False)
    ]
    astronauts.extend(challenger_crew)
    
    challenger = Mission(
        name="STS-51-L",
        date=date(1986, 1, 28),
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Challenger_crew.jpg/800px-Challenger_crew.jpg",
        crew=[astronaut.name for astronaut in challenger_crew],
        space_shuttle="Space Shuttle Challenger",
        country="USA",
        isFavorite=True
    )
    missions.append(challenger)

    # STS-107 (Columbia)
    columbia_crew = [
        Astronaut(name="Rick Husband", country="USA", isInService=False),
        Astronaut(name="William McCool", country="USA", isInService=False),
        Astronaut(name="Michael Anderson", country="USA", isInService=False),
        Astronaut(name="Kalpana Chawla", country="USA", isInService=False),
        Astronaut(name="David Brown", country="USA", isInService=False),
        Astronaut(name="Laurel Clark", country="USA", isInService=False),
        Astronaut(name="Ilan Ramon", country="Israel", isInService=False)
    ]
    astronauts.extend(columbia_crew)
    
    columbia = Mission(
        name="STS-107",
        date=date(2003, 1, 16),
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/STS-107_crew.jpg/800px-STS-107_crew.jpg",
        crew=[astronaut.name for astronaut in columbia_crew],
        space_shuttle="Space Shuttle Columbia",
        country="USA",
        isFavorite=True
    )
    missions.append(columbia)

    # Crew Dragon Demo-2
    crew_dragon_crew = [
        Astronaut(name="Robert Behnken", country="USA", isInService=True),
        Astronaut(name="Douglas Hurley", country="USA", isInService=True)
    ]
    astronauts.extend(crew_dragon_crew)
    
    crew_dragon = Mission(
        name="Crew Dragon Demo-2",
        date=date(2020, 5, 30),
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Crew_Dragon_Demo-2_crew.jpg/800px-Crew_Dragon_Demo-2_crew.jpg",
        crew=[astronaut.name for astronaut in crew_dragon_crew],
        space_shuttle="Crew Dragon",
        country="USA",
        isFavorite=True
    )
    missions.append(crew_dragon)
    
    db.session.add_all(missions + astronauts)  # Add all missions and astronauts to the session
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
        create_missions_astronauts()
