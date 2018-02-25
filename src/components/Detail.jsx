import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Detail extends Component {
  constructor() {
    super()
  }

  getTag(tagOrGenre) {
    const item = this.props.detailList
    let tags = '', arr = []
    item[tagOrGenre].map((tag, index) => {
        arr.push(<span key={index}>{tag.name ? tag.name : tag}</span>)
        arr.push('  ')
    })
    return arr
  }

  getItemDeail(kind) {
    const item = this.props.detailList
    console.log('item:'+item);
    let detail
    switch (kind) {
      case 'book':
        detail =  
          <div className="item-detail">
            <div className="book-detail">
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
                <p className="tag">{this.getTag('tags')}</p>
              </div>
            </div>
            <hr/>
            <h2>序言</h2>
            <pre>{item['catalog']}</pre>
            <h2>简介</h2>
            <p>{item['summary']}</p>
          </div>
          break;
      case 'movie':
        detail =  
          <div className="item-detail">
            <div className='movie-detail'>
              <div className='item-img'>
                <img src={item['image']} />
              </div>
              <hr/>
              <div className='item-info'>
                <h2>简介</h2>
                <p>名称：<span>{item['title']}</span></p>
                <p className="tag">{this.getTag('tags')}</p>
                <p>上映时间：{item['year']}</p>
                <p>导演：{item['attrs']['director'].map(director => {
                  return director
                })}</p>
                <h2>演员</h2>
                <p>
                  {
                    item['attrs']['cast']
                  }
                </p>
              </div>
            </div>
          </div>
          break;
      case 'music':
        detail =            
          <div className="item-detail">
            <div className='music'>
              <div className='item-img'>
                <img src={item['image']} />
              </div>
              <div className='item-info'>
                <p>名称：<span>{item['title']}</span></p>
                <p className='tag'>{this.getTag('tags')}</p>
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
            <hr/>
            <h2>简介</h2>
            <h2>内容</h2>
            <p>{item['alt_title']}</p>
          </div>
          break;
      default:
        return null;
    }
    return detail
  }

  render() {
    return (
      this.getItemDeail(this.props.kind)
    )
  }
}

Detail.propTypes = {
  kind: PropTypes.string,
  detailList: PropTypes.object
}
module.exports = Detail