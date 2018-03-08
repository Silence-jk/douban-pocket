import React from 'react'
import { Link } from 'react-router-dom'
import { getTag } from '../../util/util'

const Item = (props) => {
  const item = props.item
  return (
    <div>
      <Link className='movie' to={`/movie/${item['id']}`}>
        <div className='item-img'>
          <img src={item['images']['small']} />
        </div>
        <div className='item-info'>
          <p>名称：<span>{item['title']}</span></p>
          <p className='tag'>{getTag('genres', item)}</p>
          <p>演员：<span>{
            item['casts'].map ? item['casts'].map(cast => {
              return cast.name + '  '
            }) : ''
          }</span></p>
          <p>评分：<span>{item['rating']['average']}</span></p>
        </div>
      </Link>
    </div>
  )
}

export default Item
