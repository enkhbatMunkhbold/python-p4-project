import React from 'react'
import "../stylesheets/mission.css"

const Astronaut = ({ astronaut, onUpdateList, onRemoveAstronaut }) => {

  if(!astronaut) {
    return <div>Loading astronaut data...</div>
  }

  const { id, name, country, missions = [], isInService } = astronaut
  
  function handleFavoriteClick() {    
    fetch(`/astronauts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify({isInService: !isInService})
    }).then(res => {
      if(!res.ok) throw new Error('Failed to update astronaut')
      return res.json()
    })
    .then(data => onUpdateList(data))
    .catch(error => console.error('Error updating astronaut:', error))
  }

  function renderMissions(list = []) {
    return list.length > 0 ? list.map((mission, index) => <li key={mission}>{mission}</li>) : <li>No Missions</li>    
  }

  function handleDelete() {
    fetch(`/astronauts/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => onRemoveAstronaut(astronaut))
  }

  return (
    <div className='card position-relative'>
      <div className='container'>
      <h5>{name}</h5>
        <hr/>
        <div className='text'>
          <p><span>Country:</span> {country}</p>
          <p><span>Missions:</span></p>
          <ul>{renderMissions(missions)}</ul>          
          <p><span>Is in Service:</span>
            {isInService ? <i className="bi bi-hand-thumbs-up-fill" onClick={handleFavoriteClick}></i> : 
              <i className="bi bi-hand-thumbs-down" onClick={handleFavoriteClick}></i>}
          </p>             
        </div>
        <div>
          <button type="button" className="btn btn-light" onClick={handleDelete}>
            DELETE <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Astronaut