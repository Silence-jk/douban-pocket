import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Tab extends Component {
  componentDidMount () {
    switch (this.props.kind) {
      case 'book':
        this._loadInitClass(0)
        break
      case 'movie':
        this._loadInitClass(1)
        break
      case 'music':
        this._loadInitClass(2)
        break
      default:
        break
    }
  }
  _loadInitClass (index) {
    let nav = this.refs.nav
    let uses = nav.querySelectorAll('use')
    let spans = nav.querySelectorAll('span')

    for (let i = 0; i < uses.length; i++) {
      if (index === i) {
        if (!uses[i].classList.contains('tab_click')) {
          uses[i].classList.add('tab_click')
          spans[i].classList.add('tab_click')
        }
      } else {
        uses[i].classList.remove('tab_click')
        spans[i].classList.remove('tab_click')
      }
    }
  }

  _loadClass (curr) {
    let nav = this.refs.nav
    let uses = nav.querySelectorAll('use')
    let spans = nav.querySelectorAll('span')

    for (let i = 0; i < uses.length; i++) {
      if (curr === uses[i]) {
        uses[i].classList.add('tab_click')
        spans[i].classList.add('tab_click')
      } else {
        uses[i].classList.remove('tab_click')
        spans[i].classList.remove('tab_click')
      }
    }
  }

  handleClick (event) {
    let curr = ''
    let use = event.target.querySelector('use')

    if (use) {
      curr = use
    } else {
      curr = event.target
    }
    this._loadClass(curr)
  }

  render () {
    return (
      <footer>
        <nav className='nav' ref='nav' onClick={this.handleClick.bind(this)}>
          <NavLink className='nav-link book' to='/book'>
            <svg className='icon tab' aria-hidden='true'>
              <use xlinkHref='#icon-book' />
            </svg>
            <span>图书</span>
          </NavLink>
          <NavLink className='nav-link' to='/movie' >
            <svg className='icon tab' aria-hidden='true'>
              <use xlinkHref='#icon-movie' />
            </svg>
            <span>电影</span>
          </NavLink>
          <NavLink className='nav-link' to='/music' >
            <svg className='icon tab' aria-hidden='true'>
              <use xlinkHref='#icon-music' />
            </svg>
            <span>音乐</span>
          </NavLink>
        </nav>
      </footer>
    )
  }
}

export default Tab
