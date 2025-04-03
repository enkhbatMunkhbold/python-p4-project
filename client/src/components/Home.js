import React, { useState } from 'react'
import '../stylesheets/home.css'
import Search from './Search'
import Mission from './Mission'

const Home = ({ missions, astronauts, setAstronauts, onUpdateMissions, onRemoveMission }) => {

  const [ search, setSearch ] = useState('')
  
  function handleSearch(input) {
    setSearch(input)
  }

  const filteredMissions = missions.filter(mission => mission.name.toLowerCase().includes(search.toLowerCase()))
 
  const displayMissions = filteredMissions.map(mission => {
    return (
      <Mission key={mission.id} 
        mission={mission} 
        astronauts={astronauts}
        setAstronauts={setAstronauts}
        onUpdateMissions={onUpdateMissions}
        onRemoveMission={onRemoveMission}
      />
    )
  }) 

  return (
    <div className='home'>
      <div className="container text-center">
        <h1>Space Missions</h1>   
        <hr className='border-line'/>   
        <Search onSearch={handleSearch}/><br/><br/>
        <ul className='cards'>
          { search.length < 1 ? null : displayMissions }        
        </ul> 
      </div>
    </div>    
  )
}

export default Home