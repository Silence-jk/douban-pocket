import React, { Component } from 'react'
import Search from './Search'
import List from './List'
import Tab from './Tab'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Search />
        <List />
        <Tab />
      </div>
    )
  }
}

module.exports = App
