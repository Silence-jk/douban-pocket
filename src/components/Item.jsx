import React, { Component } from 'react'

class Item extends Component {
  constructor () {
    super()
    this.state = {
      tags: ''
    }
  }

  componentWillMount () {
    if (this.props.kind !== 'movie') {
      this._getTag()
    }
  }

  _getTag () {
    const item = this.props.resultItem
    console.log(item)
    let tags = '', arr = []
    item.tags.map((tag, index) => {
      if (index < 3) {
        arr.push(`<span>${tag.name}</span>`)
      }
    })
    tags = arr
    this.setState({ tags })
    // name = arr.join('、')
  }

  getItemHTML (kind) {
    let itemHTML
    const item = this.props.resultItem
    console.log('item' + item)

    switch (kind) {
      case 'book':
        itemHTML =
          <div>
            <div className='book'>
              <div className='item-img'>
                <img src={item['image']} />
              </div>
              <div className='item-info'>
                <p>名称：<span>{item['title']}</span></p>
                <p className='tag' dangerouslySetInnerHTML={{ __html: this.state.tags }} />
                <p>作者：<span>{item['author']}</span></p>
                <p>评分：<span>{item['rating']['average']}</span></p>
                <p>时间：<span>{item['pubdate']}</span></p>
              </div>
            </div>
          </div>
        break
      case 'movie':
        itemHTML =
          <div>
            <div className='movie'>
              <div className='item-img'>
                <img src={item['images']['small']} />
              </div>
              <div className='item-info'>
                <p>名称：<span>{item['title']}</span></p>
                {/* <p className="tag" dangerouslySetInnerHTML={{ __html: this.state.tags }} /> */}
                <p>{item['genres'].join('  ')}</p>
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
          <div>
            <div className='music'>
              <div className='item-img'>
                <img src={item['image']} />
              </div>
              <div className='item-info'>
                <p>名称：<span>{item['title']}</span></p>
                <p className='tag' dangerouslySetInnerHTML={{ __html: this.state.tags }} />
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

  render () {
    // const item = this.props.resultItem
    // console.log('lind:'+this.props.kind)
    return (
      this.getItemHTML(this.props.kind)
    )
  }
}

module.exports = Item
