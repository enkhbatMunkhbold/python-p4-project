#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Movie, Ticket


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200

api.add_resource(Users, '/users')


class Movies(Resource):
    def get(self):
        movies = [movie.to_dict() for movie in Movie.query.all()]
        return movies, 200
    
    def post(self):
        data = request.get_json()
        new_movie = Movie(
            title=data['title'],
            genre=data['genre'],
            price=data['price']
        )
        db.session.add(new_movie)
        db.session.commit()
        return new_movie.to_dict(), 201
    
api.add_resource(Movies, '/movies')


class Tickets(Resource):
    def get(self):
        tickets = [ticket.to_dict() for ticket in Ticket.query.all()]
        return tickets, 200
    
    def post(self):
        data = request.get_json()
        new_ticket = Ticket(
            ticket_number=data['ticket_number'],
            time=data['time'],
            user_id=data['user_id'],
            movie_id=data['movie_id']
        )
        db.session.add(new_ticket)
        db.session.commit()
        return new_ticket.to_dict(), 201
    
api.add_resource(Tickets, '/tickets')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

