import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Search from './Search'
import Tab from './Tab'
import ListContainer from './ListContainer'
import NoMatch from './NoMatch'
const App = () => (
  <Router>
    <div>
      <Search />
      <Tab />
      <Switch>
        {/* <Route path="/" render={() => (<Redirect to="/book" />)}></Route > */}
        <Route exact path='/book' component={ListContainer} />
        <Route path='/movie' component={ListContainer} />
        <Route path='/music' component={ListContainer} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
)
module.exports = App