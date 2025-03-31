import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../stylesheets/details.css";

const MissionDetails = () => {

  const params = useParams();
  const missionId = params.id;
  const [mission, setMission] = useState({ crew: []})
  const { name, date, image, crew, space_shuttle, country, isFavorite } = mission 

  
  useEffect(() => {
    fetch(`/missions/${missionId}`)
    .then(res => res.json())
    .then(data => setMission(data))
  }, [missionId])

  const displayCrew = (list) => {
    return list.map((astronaut, index) => {
      return <li key={index}>{astronaut}</li>
    })
  }
  
  return (
    <div className='details container'>
      <h1>{name}</h1>
      <hr className='border-line'/>
      <div className='row'>
        <div className='col-sm-4 mx-auto'>
          <img src={image} alt={space_shuttle}/> 
          <div className='text'>
            <p><span>Country:</span> {country}</p>
            <p><span>Spacecraft:</span> {space_shuttle}</p>
            <p><span>Date:</span> {date}</p> 
            <p><span>Crew:</span></p>
            {crew?.length > 0 ? <ul>{displayCrew(crew)}</ul> : <p>No crew data available</p>} 
            <p><span>Is Mission Your Favorite:</span>
              {isFavorite ? <i className="bi bi-hand-thumbs-up-fill"></i> : 
                <i className="bi bi-hand-thumbs-down"></i>}
            </p>             
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionDetails