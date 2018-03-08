import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import Search from '../../common/Search'
import Tab from '../../common/Tab'
import Item from './MusicItem'
import LoadMore from '../../common/LoadMore'

class Page extends Component {
  constructor({ match }) {
    super()
    this.state = {
      list: {
        musics: []
      },
      q: '',
      isLoadFinish: false,
      match: match
    }
  }

  componentWillMount() {
    this._loadInitData()
  }

  _loadInitData() {
    fetchJsonp(`https://api.douban.com/v2/music/search?q=${encodeURIComponent('许巍')}&count=10`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({ list: json })
        if (json.count >= json.total) {
          this.setState({
            isLoadFinish: true
          })
        }
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
  }

  handleList(value, q) {
    this.setState({ list: value })
    this.setState({ q })
    // sessionStorage.setItem('list', JSON.stringify(value))
  }

  handleRefreshList(value) {
    if (value.count >= value.total) {
      this.setState({
        isLoadFinish: true
      })
    }
    this.setState({ list: value })
  }

  render() {
    const items = this.state.list.musics
    return (
      <div>
        <Search result={this.handleList.bind(this)} kind={this.state.match.path} />
        <main id='main'>
          {
            items.map((item, index) => (
              <Item item={item} key={index} />
            ))
          }
          {
            this.state.isLoadFinish ? <p className='load-finish'>数据加载完毕!</p>
              : <LoadMore kind={'music'} query={this.state.q} refreshList={this.handleRefreshList.bind(this)}
                isLoadFinish={this.state.isLoadFinish} />
          }
        </main>
        <Tab />
      </div>
    )
  }
}

export default MusicPage
