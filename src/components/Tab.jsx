import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import PropTypes from 'prop-types'

class Tab extends Component {
  constructor () {
    super()
  }

  componentDidMount () {

  }

  _loadClass (curr) {
    let nav = this.nav
    let uses = nav.querySelectorAll('use')
    let spans = nav.querySelectorAll('span')
    console.log('this state' + curr)

    for (let i = 0; i < uses.length; i++) {
      if (curr == uses[i]) {
        uses[i].classList.add('tab_click')
        spans[i].classList.add('tab_click')
      } else {
        uses[i].classList.remove('tab_click')
        spans[i].classList.remove('tab_click')
      }
    }
  }

  _getDefaultUrl (kind) {
    switch (kind) {
      case 'book':
        return `https://api.douban.com/v2/book/search?q=${encodeURIComponent('腾讯')}&count=5`
      case 'movie':
        return 'https://api.douban.com/v2/movie/top250?count=5'
      case 'music':
        return `https://api.douban.com/v2/music/search?q=${encodeURIComponent('许巍')}&count=5`
      default:
        return `https://api.douban.com/v2/book/search?q=${encodeURIComponent('腾讯')}&count=5`
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
    console.log(curr)
    this._loadClass(curr)
  }

  handleTabKind (kind) {
    let url = this._getDefaultUrl(kind)
    fetchJsonp(url, {
      timeout: 3000
    }).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json', json)
      this.props.result(json, kind)
      return json
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  render () {
    return (
      <footer>
        <nav className='nav' ref={nav => this.nav = nav} onClick={this.handleClick.bind(this)}>
          <a className='nav-link book' href='#' onClick={this.handleTabKind.bind(this, 'book')}>
            <svg className='icon tab' aria-hidden='true'>
              <use xlinkHref='#icon-book' className='tab_click' />
            </svg>
            <span className='tab_click'>图书</span>
          </a>
          <a className='nav-link' href='#' onClick={this.handleTabKind.bind(this, 'movie')}>
            <svg className='icon tab' aria-hidden='true'>
              <use xlinkHref='#icon-movie' />
            </svg>
            <span>电影</span>
          </a>
          <a className='nav-link' href='#' onClick={this.handleTabKind.bind(this, 'music')}>
            <svg className='icon tab' aria-hidden='true'>
              <use xlinkHref='#icon-music' />
            </svg>
            <span>音乐</span>
          </a>
        </nav>
      </footer>
    )
  }
}

Tab.propTypes = {
  result: PropTypes.func
}
module.exports = Tab
