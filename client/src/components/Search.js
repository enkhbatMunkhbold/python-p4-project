import React, { useState } from 'react'
import "../stylesheets/home.css"

const Search = ({ onSearch }) => {

  const [ searchInput, setSearchInput ] = useState('')

  function handleChange(e) {
    setSearchInput(e.target.value)
  }

  function handleClick() {    
    onSearch(searchInput)
    setSearchInput('')
  }

  return (
    <div className="input-group searchbar">
      <input type="search" className="form-control rounded" placeholder="Search for Space Mission..." aria-label="Search" aria-describedby="search-addon" value={searchInput} onChange={handleChange}/>
      <button className="btn btn-light" type="button" id="search-addon" onClick={handleClick}>Search</button>
    </div>
  )
}

export default Search