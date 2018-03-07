import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import './style.css'
import './util/iconfont.js'
import App from './component/App'

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
