import React, { useState, useEffect } from 'react'


const Users = () => {


  const [ users, setUsers ] = useState({})


  useEffect(() => {
    fetch("/users").then(r => {
      if(r.ok) {
        r.json().then(data => setUsers(data));
      }
    })
  }, [])

  const renderUsers = list => {
    return list.map(user => {
      return (
        <UserProfile key={user.id} user={user} />
      )
    })
  }


  return (
    <div>
      <ol>{renderUsers(users)}</ol>
    </div>
  )
}

export default Users