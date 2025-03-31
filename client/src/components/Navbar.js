import React from 'react';
import { NavLink } from 'react-router-dom';
import '../stylesheets/navbar.css'

const Navbar = () => {
  return (
    <div className='header'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" >NASA
            <img className='logo' src='../images/NASA.png' alt='NASA logo...'/>
          </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex px-3">
            <div className="navbar-nav">
              <NavLink className='nav-link' to='/'>Home</NavLink>
              <NavLink className='nav-link' to='/missions'>Missions</NavLink>              
              <NavLink className='nav-link' to='/astronauts'>Astronauts</NavLink>
              <NavLink className='nav-link' to='/missions/new'>Create</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar