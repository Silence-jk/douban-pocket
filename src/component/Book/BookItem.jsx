import React, {Component} from 'react'
import {NavLink, Route} from 'react-router-dom'
import BookDetail from './BookDetail'

const getTag = (tagOrGenre, item) => {
  let arr = []
  item[tagOrGenre].map((tag, index) => {
    if (index < 3) {
      arr.push(<span key={Math.random()}>{tag.name ? tag.name : tag}</span>)
      arr.push('  ')
    }
  })
  return arr
}

const Item = (props) => {
  // const {item} = props
  // console.log('item ...' +　JSON.stringify(props.item))
  const item = props.item
  return (
    <div>
      <NavLink className='book' to={`/book/${item['id']}`}>
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
      </NavLink>
    </div>
  )
}

export default Item
