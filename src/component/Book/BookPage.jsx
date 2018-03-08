import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import Search from '../../common/Search'
import Tab from '../../common/Tab'
import Item from './BookItem'
import LoadMore from '../../common/LoadMore'

class BookPage extends Component {
  constructor ({match}) {
    super()
    this.state = {
      list: {
        books: []
      },
      q: '',
      isLoadFinish: false,
      match: match
    }
  }

  componentWillMount () {
    /* if (sessionStorage.getItem('list')) {
      let list = JSON.parse(sessionStorage.getItem('list'))
      this.setState({list})
      console.log('...')
    } else { */
    this._loadInitData()
    // }
  }

  _loadInitData () {
    fetchJsonp(`https://api.douban.com/v2/book/search?q=${encodeURIComponent('腾讯')}&count=10`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        // sessionStorage.setItem('list', JSON.stringify(json))
        this.setState({list: json})
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
        isLoadFinish: true
      })
    }
    this.setState({list: value})
    // sessionStorage.setItem('list', JSON.stringify(value))
  }

  render () {
    const items = this.state.list.books
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
          this.state.isLoadFinish ? <p>数据加载完毕!</p>
          : <LoadMore kind={'book'} query={this.state.q} refreshList={this.handleRefreshList.bind(this)} />
        }
        </main>
        <Tab />
      </div>
    )
  }
}

export default BookPage
