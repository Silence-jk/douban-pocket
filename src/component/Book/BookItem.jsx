import React from 'react'
import {Link} from 'react-router-dom'
import {getTag} from '../../util/util'

const Item = (props) => {
  const item = props.item
  return (
    <div>
      <Link className='book' to={`/book/${item['id']}`}>
        <div className='item-img'>
          <img src={item['image']} />
        </div>
        <div className='item-info'>
          <p>名称：<span>{item['title']}</span></p>
          <p className='tag'>{getTag('tags', item)}</p>
          <p>作者：<span>{item['author'].join('  ')}</span></p>
          <p>评分：<span>{item['rating']['average']}</span></p>
          <p>时间：<span>{item['pubdate']}</span></p>
        </div>
      </Link>
    </div>
  )
}

export default Item
