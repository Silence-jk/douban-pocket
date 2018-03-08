import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import SearchBar from '../../common/SearchBar'
import { getTag } from '../../util/util'

class Detail extends Component {
  constructor ({ match }) {
    super()
    this.state = {
      url: `https://api.douban.com/v2/movie/subject/${match.params.id}`,
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
                <div className='movie-detail'>
                  <div className='item-img'>
                    <img src={item['images']['large']} alt='无法载入图像' />
                  </div>
                  <hr />
                  <div className='item-info'>
                    <h2>简介</h2>
                    <p>名称：<span>{item['title']}</span></p>
                    <p className='tag'>{getTag('genres', item)}</p>
                    <p>上映时间：{item['year']}</p>
                    <p>导演：{item['directors'].map(director => {
                      return director.name
                    })}</p>
                    <h2>演员</h2>
                    <p>
                      {
                          item['casts'].map(cast => {
                            let imgSrc = cast['avatars']['large']
                            return <img src={imgSrc} alt='无法载入图像' key={cast.id} />
                          })
                        }
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        }
      </div>
    )
  }
}

export default Detail
