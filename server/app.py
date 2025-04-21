#!/usr/bin/env python3

from flask import request, session, jsonify, make_response
from flask_restful import Resource

from config import app, db, api
from models import User, Movie, Ticket


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
        return make_response(jsonify(movies), 200)
    
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
        try:
            data = request.get_json()        
            
            movie = Movie.query.get(data['movie_id'])
            if not movie:
                return {'error': 'Movie not found'}, 404
            
            ticket_number = int(data['ticket_number'])
            total_price = movie.price * ticket_number
           
            new_ticket = Ticket(
                ticket_number=ticket_number,
                total_price=total_price,  
                time=data['time'],
                user_id=data['user_id'],
                movie_id=data['movie_id']
            )

            db.session.add(new_ticket)
            db.session.commit()

            return new_ticket.to_dict(), 201

        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400
    
api.add_resource(Tickets, '/tickets')

class ClearSession(Resource):
    def delete(self):
        db.session.remove()
        return '', 204

api.add_resource(ClearSession, '/clear')

class SignUp(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(username=data['username'])
        new_user.password_hash = data['password']
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return new_user.to_dict(), 201

api.add_resource(SignUp, '/signup')

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return make_response( jsonify(user.to_dict()), 200 ) 
        
        return {}, 204
    
api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if user and user.authenticate(data['password']):
            session['user_id'] = user.id
            return make_response( jsonify(user.to_dict()), 200 )
        return {'message': 'Invalid credentials'}, 401
        
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

