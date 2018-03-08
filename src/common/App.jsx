import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import BookPage from '../component/Book/BookPage'
import BookDetail from '../component/Book/BookDetail'
import MoviePage from '../component/Movie/MoviePage'
import MovieDetail from '../component/Movie/MovieDetail'
import MusicPage from '../component/Muisc/MusicPage'
import MusicDetail from '../component/Muisc/MusicDetail'
import NoMatch from './NoMatch'
const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={BookPage} />
        <Route path={`/book/:id`} component={BookDetail} />
        <Route path='/book' component={BookPage} />
        <Route path='/movie/:id' component={MovieDetail} />
        <Route path='/movie' component={MoviePage} />
        <Route path='/music/:id' component={MusicDetail} />
        <Route path='/music' component={MusicPage} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
)

export default App
