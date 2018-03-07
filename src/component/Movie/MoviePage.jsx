import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import Search from '../Search'
import Tab from '../Tab'
import Item from './BookItem'
import LoadMore from '../LoadMore'

class MoviePage extends Component {
  constructor() {
    super()
    this.state = {
      list: {
        subjects: []
      },
      q: '',
      isLoadFinsh: false
    }
  }

  componentWillMount() {
    if (sessionStorage.getItem('list')) {
      let list = JSON.parse(sessionStorage.getItem('list'))
      this.setState({ list })
      console.log('...')
    } else {
      this._loadInitData()
    }
  }

  _loadInitData() {
    fetchJsonp(`https://api.douban.com/v2/movie/search?q=${encodeURIComponent('腾讯')}&count=5`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        sessionStorage.setItem('list', JSON.stringify(json))
        this.setState({ list: json })
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
  }

  handleList(value, q) {
    this.setState({ list: value })
    this.setState({ q })
    sessionStorage.setItem('list', JSON.stringify(value))
  }

  handleRefreshList(value) {
    if (value.count >= value.total) {
      this.setState({
        isLoadFinsh: true
      })
    }
    this.setState({ list: value })
    sessionStorage.setItem('list', JSON.stringify(value))
  }

  render() {
    const items = this.state.list.books
    return (
      <div>
        <Search result={this.handleList.bind(this)} />
        <main id="main">
          {
            items.map((item, index) => (
              <Item item={item} key={index} />
            ))
          }
          {
            this.state.isLoadFinsh ? <p className='load-finish'>数据加载完毕!</p> :
              <LoadMore kind={'movie'} query={this.state.q} refreshList={this.handleRefreshList.bind(this)} />
          }
        </main>
        <Tab />
      </div>
    )
  }
}

export default BookPage
