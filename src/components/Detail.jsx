import React, {Component} from 'react'

class Detail extends Component {
  constructor() {
    super()
  }

  _getTag(tagOrGenre) {
    const item = this.props.detail
    let tags = '', arr = []
    item[tagOrGenre].map((tag, index) => {
      if (index < 3) {
        arr.push(<span>{tag.name ? tag.name : tag}</span>)
        arr.push('  ')
      }
    })
    return arr
  }

  _getItemDeail(kind) {
    const item = this.props.detail
    console.log('item:'+item.toString());
    
    switch (kind) {
      case 'book':
        <div className="book-detail">
          <div className='book'>
            <div className='item-img'>
              <img src={item['image']} />
            </div>
            <div className='item-info'>
              <p>名称：<span>{item['title']}</span></p>
              <p>作者：<span>{item['author']}</span></p>
              <p>出版社：<span>{item['publisher']}</span></p>
              <p>日期：<span>{item['pubdate']}</span></p>
              <p>评分：<span>{item['rating']["average"]}</span></p>
              <p>价钱：<span>&yen;{item['price']}</span></p>
              <p className="tag">{this._getTag('tags')}</p>
            </div>
          </div>
          <h2>序言</h2>
          <p>{item['catalog']}</p>
          <h2>简介</h2>
          <p>{item['summary']}</p>
        </div>
      case 'movie':
        <div className="movie-detail">
          <div className='movie'>
            <div className='item-img'>
              <img src={item['images']['large']} />
            </div>
            <div className='item-info'>
              <h2>简介</h2>
              <p>名称：<span>{item['title']}</span></p>
              <p className="tag">{this._getTag('genres')}</p>
              <p>上映时间：{item['year']}</p>
              <p>导演：{item['directors'].map(director => {
                return director.name + '  '
              })}</p>
              <h2>演员</h2>
              <div>
                {
                  item['casts'].map ? item['casts'].map(cast => {
                    return <div>cast['avatars']['large']</div>
                  }) : ''
                }
              </div>
            </div>
          </div>
        </div>
      case 'music':
        <div className="music-detail">
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
              <p>发布商：<span>{item['attrs']['publisher']}</span></p>
              <p>发布时间：<span>{item['attrs']['pubdate']}</span></p>
              <p>评分：<span>{item['rating']['average']}</span></p>
            </div>
          </div>
          <h2>简介</h2>
          <h2>内容</h2>
          <p>{item['alt_title']}</p>
        </div>
      default:
        return null;
    }
  }

  render() {
    return (
      this._getItemDeail(this.props.kind)
    )
  }
}

module.exports = Detail