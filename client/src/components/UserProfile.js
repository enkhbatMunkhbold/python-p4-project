import React from 'react'

const UserProfile = ({ user }) => {

  if(!user) return <div>Loading...</div>

  return (
    <div>
      <h2>{user.username}, your tickets</h2>
      <div className='user-profile'></div>      
        
        <h3>Tickets Purchased: {user.tickets.length}</h3>
    </div>
  )
}

export default UserProfile