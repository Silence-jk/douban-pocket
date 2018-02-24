import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import PropTypes from 'prop-types'

class Search extends Component {
  constructor () {
    super()
    this.state = {
      value: ''
    }
  }

  // 在组件渲染前调用，可以在里面用fetchJsonp设置初始页面
  componentWillMount () {
    fetchJsonp(`https://api.douban.com/v2/book/search?q=${encodeURIComponent('腾讯')}&count=5`, {
      timeout: 3000
    }).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json', json)
      this.props.list(json)
      return json
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  _getPlaceHolder (kind) {
    switch (kind) {
      case 'movie':
        return '电影、影人、影院、电视剧'
      case 'music':
        return '唱片名、表演者、条码、ISRC'
      case 'book':
      default:
        return '书名、作者、ISBN'
    }
  }

  _getPage () {
    let page
    if (this.props.isShowDetail) {
      page = 
        <section className='detail-page'>
          <a onClick={this.handleBack.bind(this)}>
            <svg className='icon back' aria-hidden='true'>
              <use xlinkHref='#icon-back' />
            </svg>
          </a>
          <span>{this.props.kind}</span>
        </section> 
    } else {
      page = 
        <section className='search-page'>
          <form action=''>
            <input type='text' placeholder={this._getPlaceHolder(this.props.kind)} onKeyUp={this.handleKeyUp.bind(this)} required />
            <a onClick={this.handleSearch.bind(this)}>
              <svg className='icon search' aria-hidden='true'>
                <use xlinkHref='#icon-search' />
              </svg>
            </a>
            <input id='hiddenText' type='text' style={{ display: 'none' }} />
          </form>
        </section>
    }
    return page
  }

  handleSearch (value) {
    if (this.state.value !== '') {
      let value = this.state.value
    }

    fetchJsonp(`https://api.douban.com/v2/${this.props.kind}/search?q=${value}&count=5`, {
      timeout: 3000
    }).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json', json)
      this.props.list(json)
      return json
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  handleKeyUp (event) {
    const value = event.target.value
    if (event.keyCode === 13) {
      this.handleSearch(value)
      return
    }
    this.setState({ value: event.target.value })
  }

  handleBack () {
    this.props.detailStatus(false)
  }

  render () {
    return (
      <header data-status='search'>
        <div className='header-wrap'>
          {this._getPage()}
        </div>
      </header>
    )
  }
}

Search.propTypes = {
  isShowDetail: PropTypes.bool,
  list: PropTypes.func,
  kind: PropTypes.string
}

module.exports = Search
