#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Mission, Astronaut, MissionsAstronauts  # Import models


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class AstronautList(Resource):
    def get(self):
        astronauts = [astronaut.to_dict() for astronaut in Astronaut.query.all()]
        return astronauts, 200

api.add_resource(AstronautList, '/astronauts')


class MissionList(Resource):
    def get(self):
        missions = [mission.to_dict() for mission in Mission.query.all()]
        return missions, 200

    def post(self):
        data = request.get_json()

        try:
            # Validate the input data
            if not all(key in data for key in ['name', 'date', 'image_url', 'crew', 'space_shuttle', 'country']):
                return {'error': 'Missing required fields'}, 400

            # Check if the mission already exists
            mission = Mission.query.filter_by(name=data['name']).first()
            if mission:
                return {'error': 'Mission already exists'}, 409
            new_mission = Mission(**data)
            db.session.add(new_mission)
            db.session.commit()
            return new_mission.to_dict(), 201
        except ValueError as e:
            return {'error': str(e)}, 400 
    
api.add_resource(MissionList, '/missions')


class MissionByID(Resource):
    def get(self, mission_id):
        mission = Mission.query.filter_by(id=mission_id).first()
        if not mission:
            return {'error': 'Mission not found'}, 404
        return mission.to_dict(), 200

    def post(self):
        data = request.get_json()
        new_mission = Mission(**data)
        db.session.add(new_mission)
        db.session.commit()
        return new_mission.to_dict(), 201

    def put(self, mission_id):
        data = request.get_json()
        mission = Mission.query.get_or_404(mission_id)
        for key, value in data.items():
            setattr(mission, key, value)
        db.session.commit()
        return mission.to_dict(), 200

    def delete(self, mission_id):
        mission = Mission.query.get_or_404(mission_id)
        db.session.delete(mission)
        db.session.commit()
        return '', 204
    
api.add_resource(MissionByID, '/missions/<int:mission_id>', '/missions')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

