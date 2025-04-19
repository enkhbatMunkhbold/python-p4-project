import React, { useState, useEffect } from 'react'


const Tickets = () => {

  const [ tickets, setTickets ] = useState({})

  useEffect(() => {
    fetch("/tickets").then(r => {
      if(r.ok) {
        r.json().then(data => setTickets(data));
      }
    })
  }, [])


  const renderTickets = list => {
    return list.map(ticket => {
      return (
        <li key={ticket.id}>
          <h2>{ticket.name}</h2>
        </li>
      )
    })
  }

  return (
    <div>
      <h1>Tickets</h1>
      <p>{renderTickets(tickets)}</p>
    </div>
  )
}

export default Tickets