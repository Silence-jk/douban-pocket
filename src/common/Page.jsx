import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import Search from './Search'
import Tab from './Tab'
import MusicItem from '../component/Muisc/MusicItem'
import BookItem from '../component/Book/BookItem'
import MovieItem from '../component/Movie/MovieItem'
import LoadMore from './LoadMore'

class Page extends Component {
  constructor () {
    super()
    this.state = {
      list: {
        musics: [],
        books: [],
        subjects: []
      },
      q: '',
      isLoadFinish: false
    }
  }

  componentWillMount () {
    this._loadInitData()
  }

  _loadInitData () {
    fetchJsonp(this.props.url, {
      timeout: 3000
    }).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json', json)
      this.setState({list: json})
      if (json.count >= json.total) {
        this.setState({
          isLoadFinish: true
        })
      }
      return json
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  _getKind () {
    switch (this.props.kind) {
      case '/':
      case '/book':
        return 'book'
      case '/movie':
        return 'movie'
      case '/music':
        return 'music'
      default:
        break
    }
  }

  _getListkinds () {
    switch (this.props.kind) {
      case '/':
      case '/book':
        return this.state.list.books
      case '/movie':
        return this.state.list.subjects
      case '/music':
        return this.state.list.musics
      default:
        break
    }
  }

  _getItem (item, index) {
    switch (this.props.kind) {
      case '/':
      case '/book':
        return <BookItem item={item} key={index} />
      case '/movie':
        return <MovieItem item={item} key={index} />
      case '/music':
        return <MusicItem item={item} key={index} />
      default:
        break
    }
  }

  handleList (value, q) {
    this.setState({ list: value })
    this.setState({ q })
    this.setState({isLoadFinish: false})
    // sessionStorage.setItem('list', JSON.stringify(value))
  }

  handleRefreshList (value) {
    if (value.count >= value.total) {
      this.setState({
        isLoadFinish: true
      })
    }
    this.setState({ list: value })

  /*   let d = document.createDocumentFragment()
    let items
    switch (kind) {
      case 'book':
        items = value.books
        break;
      case 'movie':
        items = value.subjects
        break
      case 'music':
        items = value.musics
        break;
      default:
        break;
    }
    items.map((item, index) => (
      d.appendChild(this._getItem(item, index))
    ))
    this.refs.main.appendChild(d) */
  }

  render () {
    const items = this._getListkinds()
    return (
      <div>
        <Search result={this.handleList.bind(this)} kind={this._getKind()} />
        <main id='main' ref='main'>
          {
            items.map((item, index) => (
              this._getItem(item, index)
            ))
          }
          {
            this.state.isLoadFinish ? <p className='load-finish'>数据加载完毕!</p>
              : <LoadMore kind={this._getKind()} query={this.state.q} refreshList={this.handleRefreshList.bind(this)}
                isLoadFinish={this.state.isLoadFinish} />
          }
        </main>
        <Tab kind={this._getKind()} />
      </div>
    )
  }
}

export default Page
