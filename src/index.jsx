import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import './util/iconfont.js'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/reducer'
import App from './containers/App'

const store = createStore(reducer)
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
