from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    # Relationships
    tickets = db.relationship('Ticket', back_populates='user', cascade='all, delete-orphan')
    movies = association_proxy('tickets', 'movie')

    # Serializer fields
    serialize_rules = ('-tickets.users', '-movies.users')

    @hybrid_property
    def password_hash(self):
        raise Exception("Password hash is not accessible directly")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode('utf-8'))

    @validates('username')
    def validate_username(self, _, username):
        if not username:
            raise ValueError("Username cannot be empty")
        if len(username) < 3:
            raise ValueError("Username must be at least 3 characters long")
        return username
    

class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    genre = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)


    # Relationships
    tickets = db.relationship('Ticket', back_populates='movie', cascade='all, delete-orphan')
    users = association_proxy('tickets', 'user')

    # Serializer fields
    serialize_rules = ('-tickets',)

    @validates('title', 'genre')
    def validate_non_empty_string(self, key, value):
        if not value:
            raise ValueError(f"{key} cannot be empty")
        if len(value) < 3:
            raise ValueError(f"{key} must be at least 3 characters long")
        return value
    
    @validates('price')
    def validate_price(self, _, price):
        if price <= 0:
            raise ValueError("Price must be greater than 0")
        return price
  

class Ticket(db.Model, SerializerMixin):
    __tablename__ = 'tickets'

    AVAILABLE_TIMES = ['12:00 pm', '2:00 pm', '4:00 pm', '6:00 pm', '8:00 pm']

    id = db.Column(db.Integer, primary_key=True)
    ticket_number = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float(precision=2), nullable=False)
    time = db.Column(db.String(20), nullable=False)

    # Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='tickets')
    movie = db.relationship('Movie', back_populates='tickets')

    # Serializer fields
    serialize_rules = ('-user.tickets', '-movie.tickets')

    @validates('total_price')
    def validate_price(self, _, price):
        if price <= 0:
            raise ValueError("Price must be greater than 0")
        return price
    
    @validates('time')
    def validate_time(self, _, time):
        if not time:
            raise ValueError("Time cannot be empty")
        if time not in self.AVAILABLE_TIMES:
            raise ValueError(f"Time must be one of {self.AVAILABLE_TIMES}")
        return time
    
    @validates('ticket_number') 
    def validate_ticket_number(self, _, ticket_number):
        if not isinstance(ticket_number, int) or ticket_number <= 0:
            raise ValueError("Ticket number must be a positive integer")
        return ticket_number
