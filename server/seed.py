#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Movie, Ticket

def create_users():
  
    test_user = User(username='test_user')   
    return [test_user]

def create_movies():
    movies = []

    m1 = Movie(title='Inception', genre='Sci-Fi', price=randint(5, 15))
    m2 = Movie(title='The Dark Knight', genre='Action', price=randint(5, 15))
    m3 = Movie(title='Interstellar', genre='Sci-Fi', price=randint(5, 15))
    m4 = Movie(title='The Matrix', genre='Sci-Fi', price=randint(5, 15))
    m5 = Movie(title='The Godfather', genre='Crime', price=randint(5, 15))
    m6 = Movie(title='Pulp Fiction', genre='Crime', price=randint(5, 15))
    m7 = Movie(title='The Shawshank Redemption', genre='Drama', price=randint(5, 15))
    m8 = Movie(title='Forrest Gump', genre='Drama', price=randint(5, 15))

    movies.extend([m1, m2, m3, m4, m5, m6, m7, m8]) 
    return movies

def create_tickets():
    tickets = []
    # users = User.query.all()
    test_user = User.query.first()
    movies = Movie.query.all()

    for _ in range(10):
        ticket = Ticket(
            ticket_number=randint(1, 5),
            time=rc(Ticket.AVAILABLE_TIMES),
            user=test_user,
            movie=rc(movies)
        )
        ticket.total_price = ticket.ticket_number * ticket.movie.price
        tickets.append(ticket)  

        # other_users = User.query.filter(User.username!= "test_user").all()
        # for _ in range(10):
        #     ticket = Ticket(
        #         ticket_number=randint(1, 5),
        #         time=rc(Ticket.AVAILABLE_TIMES),
        #         user=rc(other_users),
        #         movie=rc(movies)
        #     )
        #     ticket.total_price = ticket.ticket_number * ticket.movie.price
        #     tickets.append(ticket)  

    return tickets


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        # Seed code goes here!
        print("Creating database...")
        User.query.delete()
        Movie.query.delete()
        Ticket.query.delete()

        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding movies...")
        movies = create_movies()
        db.session.add_all(movies)
        db.session.commit()

        print("Seeding tickets...")
        tickets = create_tickets()
        db.session.add_all(tickets)
        db.session.commit()

        print("Done seeding...")
        
