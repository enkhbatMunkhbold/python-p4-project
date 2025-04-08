#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, date

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Mission, Astronaut, MissionsAstronauts

def create_missions_and_astronauts():
    missions_data = [
        {
            "name": "Apollo 11",
            "date": date(1969, 7, 16),
            "image_url": "https://www.nasa.gov/sites/default/files/thumbnails/image/apollo11_crew.jpg",
            "space_shuttle": "Saturn V",
            "country": "USA",
            "isFavorite": True,
            "crew": [
                {"name": "Neil Armstrong", "country": "USA", "isInService": False},
                {"name": "Buzz Aldrin", "country": "USA", "isInService": False},
                {"name": "Michael Collins", "country": "USA", "isInService": False},
            ]
        },
        {
            "name": "Soyuz 11",
            "date": date(1971, 6, 6),
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Soyuz_11_crew.jpg/800px-Soyuz_11_crew.jpg",
            "space_shuttle": "Soyuz 7K-OKS",
            "country": "USSR",
            "isFavorite": True,
            "crew": [
                {"name": "Georgy Dobrovolsky", "country": "USSR", "isInService": False},
                {"name": "Viktor Patsayev", "country": "USSR", "isInService": False},
                {"name": "Vladislav Volkov", "country": "USSR", "isInService": False},
            ]
        },
        {
            "name": "STS-51-L",
            "date": date(1986, 1, 28),
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Challenger_crew.jpg/800px-Challenger_crew.jpg",
            "space_shuttle": "Space Shuttle Challenger",
            "country": "USA",
            "isFavorite": True,
            "crew": [
                {"name": "Francis Scobee", "country": "USA", "isInService": False},
                {"name": "Michael Smith", "country": "USA", "isInService": False},
                {"name": "Judith Resnik", "country": "USA", "isInService": False},
                {"name": "Ellison Onizuka", "country": "USA", "isInService": False},
                {"name": "Ronald McNair", "country": "USA", "isInService": False},
                {"name": "Gregory Jarvis", "country": "USA", "isInService": False},
                {"name": "Christa McAuliffe", "country": "USA", "isInService": False},
            ]
        },
        {
            "name": "STS-107",
            "date": date(2003, 1, 16),
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/STS-107_crew.jpg/800px-STS-107_crew.jpg",
            "space_shuttle": "Space Shuttle Columbia",
            "country": "USA",
            "isFavorite": True,
            "crew": [
                {"name": "Rick Husband", "country": "USA", "isInService": False},
                {"name": "William McCool", "country": "USA", "isInService": False},
                {"name": "Michael Anderson", "country": "USA", "isInService": False},
                {"name": "Kalpana Chawla", "country": "USA", "isInService": False},
                {"name": "David Brown", "country": "USA", "isInService": False},
                {"name": "Laurel Clark", "country": "USA", "isInService": False},
                {"name": "Ilan Ramon", "country": "Israel", "isInService": False},
            ]
        },
        {
            "name": "Crew Dragon Demo-2",
            "date": date(2020, 5, 30),
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Crew_Dragon_Demo-2_crew.jpg/800px-Crew_Dragon_Demo-2_crew.jpg",
            "space_shuttle": "Crew Dragon",
            "country": "USA",
            "isFavorite": True,
            "crew": [
                {"name": "Robert Behnken", "country": "USA", "isInService": True},
                {"name": "Douglas Hurley", "country": "USA", "isInService": True},
            ]
        },
        {
            "name": "Gemini 12",
            "date": date(1966, 11, 11),
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Gemini_12_crew.jpg/800px-Gemini_12_crew.jpg",
            "space_shuttle": "Gemini 12",
            "country": "USA",
            "isFavorite": False,
            "crew": [
                {"name": "Jim Lovell", "country": "USA", "isInService": False},
                {"name": "Buzz Aldrin", "country": "USA", "isInService": False}
            ]
        },
        {
            "name": "Apollo 13",
            "date": date(1970, 4, 11),
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Apollo_13_crew.jpg/800px-Apollo_13_crew.jpg",
            "space_shuttle": "Apollo 13",
            "country": "USA",
            "isFavorite": True,
            "crew": [
                {"name": "Jim Lovell", "country": "USA", "isInService": False},
                {"name": "Jack Swigert", "country": "USA", "isInService": False},
                {"name": "Fred Haise", "country": "USA", "isInService": False},
            ]
        },
    ]

    for mission_info in missions_data:
        mission = Mission(
            name=mission_info["name"],
            date=mission_info["date"],
            image_url=mission_info["image_url"],
            crew=[member["name"] for member in mission_info["crew"]],
            space_shuttle=mission_info["space_shuttle"],
            country=mission_info["country"],
            isFavorite=mission_info["isFavorite"]
        )
        db.session.add(mission)
        db.session.flush()  # Get mission.id

        for astronaut_info in mission_info["crew"]:
            # Check if astronaut already exists
            astronaut = Astronaut.query.filter_by(name=astronaut_info["name"]).first()
            if astronaut:
                # If exists, just link to the mission
                db.session.add(MissionsAstronauts(
                    mission_id=mission.id,
                    astronaut_id=astronaut.id
                ))
                continue
            # If not, create a new astronaut
            astronaut = Astronaut(
                name=astronaut_info["name"],
                country=astronaut_info["country"],
                isInService=astronaut_info["isInService"]
            )
            db.session.add(astronaut)
            db.session.flush()  # Get astronaut.id

            db.session.add(MissionsAstronauts(
                mission_id=mission.id,
                astronaut_id=astronaut.id
            ))

    db.session.commit()


def create_extra_missions_astronauts_links():
    mission_ids = [m.id for m in Mission.query.all()]
    astronaut_ids = [a.id for a in Astronaut.query.all()]
    links = []

    for _ in range(len(astronaut_ids)):
        links.append(MissionsAstronauts(
            mission_id=rc(mission_ids),
            astronaut_id=rc(astronaut_ids)
        ))

    db.session.add_all(links)
    db.session.commit()


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Resetting database...")
        db.drop_all()
        db.create_all()

        print("Seeding missions and astronauts...")
        create_missions_and_astronauts()

        # print("Creating extra random mission-astronaut links...")
        # create_extra_missions_astronauts_links()

        print("Seeding complete!")
