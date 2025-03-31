import React, { useState } from 'react'
import '../stylesheets/home.css'
import Search from './Search'
import Mission from './Mission'

const Home = ({ missions, onUpdateList }) => {

  const [ search, setSearch ] = useState('')
  
  function handleSearch(input) {
    setSearch(input)
  }

  const filteredMissions = missions.filter(mission => mission.space_shuttle.toLowerCase().includes(search.toLowerCase()))
 
  const displayMissions = filteredMissions.map(mission => {
    return (
      <Mission key={mission.id} 
        mission={mission} 
        onUpdateList={onUpdateList}
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