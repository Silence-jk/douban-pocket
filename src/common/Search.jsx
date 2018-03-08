import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
class Search extends Component {
  constructor () {
    super()
    this.state = {
      value: ''
    }
  }

  // https://api.douban.com/v2/book/search?q=A&count=5
  handleSearch (value) {
    // value = this.state.value
    // console.log('ss: ' + value)
    if (this.state.value !== '') {
      value = this.state.value
    }
    let kind
    switch (this.props.kind) {
      case '/':
      case '/book':
        kind = 'book'        
        break;
      case '/music':
        kind = 'music'
        break
      case '/movie':
        kind = 'movie'
        break  
      default:
        break;
    }
    fetchJsonp(`https://api.douban.com/v2/${kind}/search?q=${value}&count=5`, {
      timeout: 3000
    }).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json', json)
      this.props.result(json, value)
      return json
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }
  handleKeyUp (event) {
    const value = event.target.value
    console.log(value)
    if (event.keyCode === 13) {
      console.log('come in')
      this.handleSearch(value)
    } else {
      this.setState({ value: event.target.value })
    }
  }
  render () {
    return (
      <header data-status='search'>
        <div className='header-wrap'>
          <section className='search-page'>
            <form action='/' method='get'>
              <input className='show' type='text' placeholder='书名、作者、ISBN' onKeyUp={this.handleKeyUp.bind(this)} required />
              <a onClick={this.handleSearch.bind(this)}>
                <svg className='icon search' aria-hidden='true'>
                  <use xlinkHref='#icon-search' />
                </svg>
              </a>
              {/* 解决form表单中只有一个input时回车自动刷新的问题 */}
              <input id='hiddenText' type='text' style={{ display: 'none' }} />
            </form>
          </section>
        </div>
      </header>
    )
  }
}

export default Search
