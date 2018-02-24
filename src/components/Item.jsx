import React, { Component } from 'react'
import fetchJsonp from "fetch-jsonp";

class Item extends Component {
  constructor () {
    super()
  }
  
  _getTag(tagOrGenre) {
    const item = this.props.resultItem
    let tags = '', arr = []
    item[tagOrGenre].map((tag, index) => {
      if (index < 3) {
        arr.push(<span key={Math.random()}>{tag.name ? tag.name : tag}</span>)
        arr.push('  ')
      }
    })
    return arr
  }

  
  getItemHTML (kind) {
    let itemHTML
    const item = this.props.resultItem

    switch (kind) {
      case 'book':
        itemHTML =
          <div onClick={this.handleClick.bind(this, kind, item['id'])}>
            <div className='book'>
              <div className='item-img'>
                <img src={item['image']} />
              </div>
              <div className='item-info'>
                <p>名称：<span>{item['title']}</span></p>
                <p className='tag'>{this._getTag('tags')}</p>
                <p>作者：<span>{item['author'].join('  ')}</span></p>
                <p>评分：<span>{item['rating']['average']}</span></p>
                <p>时间：<span>{item['pubdate']}</span></p>
              </div>
            </div>
          </div>
        break
      case 'movie':
        itemHTML =
          <div onClick={this.handleClick.bind(this, kind, item['id'])}>
            <div className='movie'>
              <div className='item-img'>
                <img src={item['images']['small']} />
              </div>
              <div className='item-info'>
                <p>名称：<span>{item['title']}</span></p>
                <p className='tag'>{this._getTag('genres')}</p>
                <p>演员：<span>{
                  item['casts'].map ? item['casts'].map(cast => {
                    return cast.name + '  '
                  }) : ''
                }</span></p>
                <p>评分：<span>{item['rating']['average']}</span></p>
              </div>
            </div>
          </div>
        break
      case 'music':
        itemHTML =
          <div onClick={this.handleClick.bind(this, kind, item['id'])}>
            <div className='music'>
              <div className='item-img'>
                <img src={item['image']} />
              </div>
              <div className='item-info'>
                <p>名称：<span>{item['title']}</span></p>
                <p className='tag'>{this._getTag('tags')}</p>
                <p>作者：<span>{
                  item['author'].map(author => {
                    return author.name
                  })
                }</span></p>
                <p>评分：<span>{item['rating']['average']}</span></p>
              </div>
            </div>
          </div>
        break
      default:
        break
    }

    return itemHTML
  }

  handleClick (kind, id) {
    fetchJsonp(`https://api.douban.com/v2/${kind}/${id}`, {
      timeout: 3000
    }).then((response) => {
      return response.json()
    }).then((json) => {
      console.log('parsed json', json)
      this.props.detail(json)
      return json
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  render () {
    return (
      this.getItemHTML(this.props.kind)
    )
  }
}

module.exports = Item
