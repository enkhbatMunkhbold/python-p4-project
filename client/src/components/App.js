import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Missions from "./Missions"
import Create from "./Create";
import "../stylesheets/app.css"
import Astronauts from "./Astronauts";
import MissionDetails from "./MissionDetails"

function App() {

  const [ missions, setMissions ] = useState([])
  const [ astronauts, setAstronauts ] = useState([])

  useEffect(() => {
    fetch('/missions')
    .then(res => res.json())
    .then(data => setMissions(data));
  }, []);

  useEffect(() => {
    fetch('/astronauts')
    .then(data => data.json())
    .then(setAstronauts)
  }, [setAstronauts]);

  function updateMissions(updatedMission) {
    const updatedList = missions.map(mission => mission.id === updatedMission.id ? updatedMission : mission)
    setMissions(updatedList)
  }

  function addMission(data) {
    setMissions([...missions, data])
  } 

  function updateAstronauts(updatedAstronaut) {
    const updatedList = astronauts.map(astronaut => astronaut.id === updatedAstronaut.id ? updatedAstronaut : astronaut)
    setAstronauts(updatedList)
  }

  function addAstronauts(data) {
    setAstronauts(preAstronauts => {
      const updatedAstronauts = [...preAstronauts]
      data.forEach(newAstro => {
        const existingIndex = updatedAstronauts.findIndex(a => a.id === newAstro.id)
        if(existingIndex >= 0) {
          updatedAstronauts[existingIndex].missions.push(newAstro.missions[0])
        } else {
          updatedAstronauts.push(newAstro)
        }
      })
      return updatedAstronauts
    })
  } 

  function removeMission(deletedMission) {
    const updatedMissions = missions.filter(mission => mission.id !== deletedMission.id)
    setMissions(updatedMissions)
  }

  function removeAstronaut(deletedAstronaut) {
    const updatedAstronauts = astronauts.filter(astro => astro.id !== deletedAstronaut.id)
    setAstronauts(updatedAstronauts)
  }

  return (
    <div className="App"> 
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={ 
            <Home missions={missions} 
              astronauts={astronauts}
              setAstronauts={setAstronauts}
              onUpdateMissions={updateMissions}
              onRemoveMission={removeMission}              
            />}/>
          <Route path="/missions" element={ 
            <Missions missions={missions} 
              astronauts={astronauts}
              setAstronauts={setAstronauts}
              onUpdateMissions={updateMissions}
              onRemoveMission={removeMission}
            />}/>        
          <Route path="/astronauts" element={ 
            <Astronauts astronauts={astronauts} 
              onUpdateList={updateAstronauts}
              onRemoveAstronaut={removeAstronaut}
            />}/>
          <Route path="/missions/new" element={
            <Create onAddMission={addMission} 
              onAddAstronauts={addAstronauts}
              onUpdateAstronauts={updateAstronauts}
              astronauts={astronauts}
            />} />
          <Route path="/missions/:id" element={ <MissionDetails/>}/>
        </Routes>      
      </Router>       
    </div>
  )
}

export default App;
