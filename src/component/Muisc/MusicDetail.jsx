import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import SearchBar from '../../common/SearchBar'
import { getTag } from '../../util/util'

class Detail extends Component {
  constructor ({ match }) {
    super()
    this.state = {
      url: `https://api.douban.com/v2/music/${match.params.id}`,
      item: null
    }
  }

  componentWillMount () {
    this._loadItem()
  }

  _loadItem () {
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

  render () {
    const item = this.state.item
    return (
      <div>
        {
          item === null ? <p>正在加载中......</p>
            : <div>
              <SearchBar title={item['title']} />
              <main>
                <div className='item-detail'>
                  <div className='music'>
                    <div className='item-img'>
                      <img src={item['image']} />
                    </div>
                    <div className='item-info'>
                      <p>名称：<span>{item['title']}</span></p>
                      <p className='tag'>{getTag('tags', item)}</p>
                      <p>作者：<span>{
                        item['author'].map(author => {
                          return author.name
                        })
                      }</span></p>
                      <p>发布商：<span>{item['attrs']['publisher']}</span></p>
                      <p>发布时间：<span>{item['attrs']['pubdate']}</span></p>
                      <p>评分：<span>{item['rating']['average']}</span></p>
                    </div>
                  </div>
                  <hr />
                  <h2>简介</h2>
                  <h2>内容</h2>
                  <p>{item['alt_title']}</p>
                </div>
              </main>
            </div>
        }
      </div>
    )
  }
}

export default Detail
