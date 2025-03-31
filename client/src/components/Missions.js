import React from 'react'
import Mission from './Mission';
import '../stylesheets/app.css'

const Missions = ({ missions, onUpdateList, onRemoveMission, onRemoveAstronaut }) => {

  function renderMissionsList(list) {
    return list.map(mission => {
      return (
        <Mission key={mission.id}
          mission = {mission}
          onUpdateList={onUpdateList}
          onRemoveMission={onRemoveMission}
          onRemoveAstronaut={onRemoveAstronaut}
        />
      )
    })
  }

  return (
    <div className="component">
      <div className="container text-center">
        <h1>Missions</h1>
        <hr className='border-line'/>
        <div className='row justify-content-center'>
          {renderMissionsList(missions)}
        </div>   
      </div>
    </div>   
  )
}

export default Missions