import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const SearchBar = (props) =>{
  const handleBack = () => {
    window.history.back()
  }

  return  (
  <header data-status='search'>
    <div className='header-wrap'>
      <section className='detail-page'>
        <a onClick={handleBack}>
          <svg className='icon back' aria-hidden='true'>
            <use xlinkHref='#icon-back' />
          </svg>
        </a>
        <span>{props.title}</span>
      </section>
    </div>
  </header>
)
}

export default SearchBar