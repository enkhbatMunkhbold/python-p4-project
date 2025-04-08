import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../stylesheets/mission.css"

const Mission = ({ mission, astronauts, setAstronauts, onUpdateMissions, onRemoveMission }) => {

  const navigate = useNavigate()
  const { id, date, image_url, crew, space_shuttle, country, isFavorite, name } = mission 
  
  function handleFavoriteClick() {    
    fetch(`/missions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify({isFavorite: !isFavorite})
    }).then(res => res.json())
    .then(data => {
      onUpdateMissions(data)
    })
  }

  function handleButtonClick() {
    navigate(`/missions/${id}`)
  }

  function handleDelete() {
    fetch(`/missions/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        onRemoveMission(mission);

        // Remove astronauts associated with the mission
        if (crew.length > 0) {
          const updatedAstronauts = [...astronauts]; // Create a copy of the astronauts list

          crew.forEach(astroName => {
            const astronaut = updatedAstronauts.find(a => a.name === astroName);
            if (astronaut) {
              if (astronaut.missions.length === 1) {
                // Delete astronaut if this is their only mission
                fetch(`/astronauts/${astronaut.id}`, {
                  method: 'DELETE'
                })
                .then(res => {
                  if (res.ok) {
                    const index = updatedAstronauts.findIndex(a => a.id === astronaut.id);
                    if (index > -1) updatedAstronauts.splice(index, 1); // Remove astronaut from the list
                    setAstronauts(updatedAstronauts); // Update state
                  }
                });
              } else {
                // Update astronaut's missions if they have other missions
                const updatedMissions = astronaut.missions.filter(m => m !== name);
                fetch(`/astronauts/${astronaut.id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ missions: updatedMissions })
                })
                .then(res => res.json())
                .then(updatedAstronaut => {
                  const index = updatedAstronauts.findIndex(a => a.id === updatedAstronaut.id);
                  if (index > -1) updatedAstronauts[index] = updatedAstronaut; // Update astronaut in the list
                  setAstronauts(updatedAstronauts); // Update state
                });
              }
            }
          });
        }
      }
    });
  }

  return (
    <div className='card position-relative'>
      <img src={image_url} alt={space_shuttle} />
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