import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import SearchBar from './SearchBar'

class Detail extends Component {
  constructor({ match }) {
    super()
    this.state = {
      url: `https://api.douban.com/v2/book/${match.params.id}`,
      item: null
    }
  }

  componentWillMount() {
    this._loadItem()
  }

  _loadItem() {
    fetchJsonp(this.state.url, {
      timeout: 3000
    }).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({ item: json })
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  getTag(tagOrGenre) {
    const item = this.state.item
    let arr = []
    item[tagOrGenre].map((tag, index) => {
      arr.push(<span key={index}>{tag.name ? tag.name : tag}</span>)
      arr.push('  ')
    })
    return arr
  }

  render() {
    const item = this.state.item
    console.log('item ' + item);

    return (
      <div>
        {
          item == null ? <div></div> :
          <div>
            <SearchBar title={item['title']} />
            <main>
              <div className='item-detail'>
                <div className='book-detail'>
                  <div className='item-img'>
                    <img src={item['image']} />
                  </div>
                  <div className='item-info'>
                    <p>名称：<span>{item['title']}</span></p>
                    <p>作者：<span>{item['author']}</span></p>
                    <p>出版社：<span>{item['publisher']}</span></p>
                    <p>日期：<span>{item['pubdate']}</span></p>
                    <p>评分：<span>{item['rating']['average']}</span></p>
                    <p>价钱：<span>&yen;{item['price']}</span></p>
                    <p className='tag'>{this.getTag('tags')}</p>
                  </div>
                </div>
                <hr />
                <h2>序言</h2>
                <pre>{item['catalog']}</pre>
                <h2>简介</h2>
                <p>{item['summary']}</p>
              </div></main></div>
      }
      </div>
    )
  }
}

export default Detail