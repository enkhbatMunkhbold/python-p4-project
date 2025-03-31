import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../stylesheets/create.css"

const Create = ({ onAddMission, onAddAstronauts, astronauts }) => {

  const navigate = useNavigate()
  const initialNewMission = {
    name: '',
    date: '',
    image: '',
    crew: [],
    space_shuttle: '',
    country: '',
    isFavorite: true
  }
  
  const [ newMission, setNewMission ]= useState(initialNewMission)
  const [ crewInput, setCrewInput ] = useState('')

  function handleChange(e) {
    let { name, value } = e.target   
    name === 'crew' ? setCrewInput(value) : setNewMission((prev) => ({ ...prev, [name]: value}))
  }

  function handleCheck(e) {
    const { name, checked } = e.target
    setNewMission({...newMission, [name]: checked})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()  
    
    const crewNames = crewInput
        .split(',')
        .map(name => name.trim())
        .filter(name => name !== '')
    
    const existingAtronautNames = astronauts.filter(astro => crewNames.includes(astro.name))
    const newAstronauts = crewNames.filter(name => !astronauts.some(astro => astro.name === name))
       .map(name => ({
        name: name,
        missions: [newMission.name],
        country: newMission.country,
        isInService: newMission.isInService
       })) 
       
    const missionData = { ...newMission, crew: crewNames }

    try {
      const missionResponse = await fetch('/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(missionData)
      })
      const missionResult = await missionResponse.json()
      onAddMission(missionResult)

      if(newAstronauts.length > 0) {
        const crewResults = []
        for (const astronaut of newAstronauts) {
          const crewResponse = await fetch('/astronauts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(astronaut)
          })

          const crewResult = await crewResponse.json()
          crewResults.push(crewResult)
        }
        onAddAstronauts(crewResults)
      }

      for (let astro of existingAtronautNames) {
        const updatedMissions = [...astro.missions, newMission.name]
        await fetch(`/astronauts/${astro.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ missions: updatedMissions })
        })
      }

      setNewMission(initialNewMission)
      setCrewInput('')
      navigate('/missions')
    }    
    catch(error) {
      console.error("Error submitting data:", error)
    }
  }

  return (
    <div className="create">
      <div className='new-mission-form'>
        <h1 className='title'>New Mission</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="missionName" className="form-label">Name</label>
            <input type="text" className="form-control" 
              name="name" aria-describedby="nameHelp" 
              value={newMission.name} onChange={handleChange}
            />
            <div id="namelHelp" className="form-text">It could be your favorite mission...</div>
          </div>
          <div className="mb-3">
            <label htmlFor="missionDate" className="form-label">Date</label>
            <input type="text" className="form-control" 
              name="date" value={newMission.date} onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="missionImage" className="form-label">Image Link</label>
            <input type="text" className="form-control" 
              name="image" value={newMission.image} onChange={handleChange}
            />
          </div>          
          <div className="mb-3">
            <label htmlFor="crew" className="form-label">Crew</label>
            <input type="text" className="form-control" 
              name="crew" value={crewInput} onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="space_shuttle" className="form-label">Space Shuttle</label>
            <input type="text" className="form-control" 
              name="space_shuttle" value={newMission.space_shuttle}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <input type="text" className="form-control" 
              name="country" value={newMission.country}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" 
              name="isFavorite" onChange={handleCheck}
            />
            <label className="form-check-label" htmlFor="isFavorite">Favorite</label>
          </div>
          <button type="submit" className="btn btn-light">Submit</button>
        </form>
      </div>      
    </div>
  )
}

export default Create;