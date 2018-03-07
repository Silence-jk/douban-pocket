import React, { Component } from 'react'
import {Route, Redirect, Switch } from 'react-router-dom'
import Search from './Search'
import BookPage from './Book/BookPage'
import BookDetail from './Book/BookDetail'
import Tab from './Tab'
import NoMatch from './NoMatch'
const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={BookPage} />
      <Route path='/book/:id' component={BookDetail} />
    
      {/* <Route path='/movie' component={MovieList} /> */}
      {/* <Route path='/music' component={MusicList} /> */}
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default App
