import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import Search from '../../common/Search'
import Tab from '../../common/Tab'
import Item from './MovieItem'
import LoadMore from '../../common/LoadMore'

class MoviePage extends Component {
  constructor ({match}) {
    super()
    this.state = {
      list: {
        subjects: []
      },
      q: '',
      isLoadFinsh: false,
      match: match
    }
  }

  componentWillMount () {
    this._loadInitData()
  }

  _loadInitData () {
    fetchJsonp(`https://api.douban.com/v2/movie/top250?count=10`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({ list: json })
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
  }

  handleList (value, q) {
    this.setState({ list: value })
    this.setState({ q })
    // sessionStorage.setItem('list', JSON.stringify(value))
  }

  handleRefreshList (value) {
    if (value.count >= value.total) {
      this.setState({
        isLoadFinsh: true
      })
    }
    this.setState({ list: value })
  }

  render () {
    const items = this.state.list.subjects
    return (
      <div>
        <Search result={this.handleList.bind(this)} kind={this.state.match.path}/>
        <main id='main'>
          {
            items.map((item, index) => (
              <Item item={item} key={index} />
            ))
          }
          {
            this.state.isLoadFinsh ? <p className='load-finish'>数据加载完毕!</p>
              : <LoadMore kind={'movie'} query={this.state.q} refreshList={this.handleRefreshList.bind(this)} />
          }
        </main>
        <Tab />
      </div>
    )
  }
}

export default MoviePage
