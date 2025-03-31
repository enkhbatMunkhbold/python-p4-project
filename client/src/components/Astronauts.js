import React from 'react'
import Astronaut from './Astronaut'
import '../stylesheets/app.css'

const Astronauts = ({ astronauts, onUpdateList, onRemoveAstronaut }) => {
  
  function renderAstronautsList(list) {
    return list.map(astro => {
      return (
        <Astronaut key={astro.id}
          astronaut={astro}
          onUpdateList={onUpdateList}
          onRemoveAstronaut={onRemoveAstronaut}
        />
      )
    })
  }

  return (
    <div className="component">
      <div className="container text-center">
        <h1>Astronauts</h1>
        <hr className='border-line'/>
        <div className='row justify-content-center'>
          {renderAstronautsList(astronauts)}
        </div>   
      </div>
    </div>   
  )
}

export default Astronauts