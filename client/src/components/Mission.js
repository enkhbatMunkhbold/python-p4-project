import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../stylesheets/mission.css"

const Mission = ({ mission, onUpdateList, onRemoveMission, onRemoveAstronaut }) => {

  const navigate = useNavigate()
  const { id, date, image, crew, space_shuttle, country, isFavorite } = mission  
  
  function handleFavoriteClick() {    
    fetch(`/missions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify({isFavorite: !isFavorite})
    }).then(res => res.json())
    .then(data => {
      onUpdateList(data)
    })
  }

  function handleButtonClick() {
    navigate(`/missions/${id}`)
  }

  function handleDelete() {
    fetch(`/missions/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => onRemoveMission(mission))

    if(crew.length > 0) {
      crew.forEach(astro => {
        fetch(`/astronauts/${astro}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => onRemoveAstronaut(astro))
      })
    }
  }

  return (
    <div className='card position-relative'>
      <img src={image} alt={space_shuttle} />
      <div className="container">
        <h5>{space_shuttle}</h5>
        <p>Country: {country}</p> 
        <p>Date: {date}</p>
        <div className="btn-toolbar justify-content-between" role="toolbar">
          <div className="btn-group" role="group" aria-label="button">
            <button className='btn btn-light' onClick={handleButtonClick}>More info...</button>
          </div>
          <div>
            <button className="btn btn-light" onClick={handleDelete}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
          <div className="favorite-group">
            <div className="favorite-group-icon">
              {isFavorite? 
                ( <i className="bi bi-heart-fill" onClick={handleFavoriteClick}></i>) : 
                ( <i className="bi bi-heart" onClick={handleFavoriteClick}></i>)
              }
            </div>               
          </div>
        </div>           
      </div>
    </div>
  )
}

export default Mission