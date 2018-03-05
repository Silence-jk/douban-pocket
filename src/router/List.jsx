import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import Item from './Item'
const List = ({ match }) => {
  let items
  console.log('list: ' + this.props.list);
  const { list } = this.props
  switch (match.path) {
    case '/book':
      items = list.books
      break
    case '/movie':
      items = list.subjects
      break
    case '/music':
      items = list.musics
      break
    default:
      items = list.books
      break
  }
  return (
    items.map((item, index) => {
      return <Item item={item} key={index} kind={kind} />
    })
  )
}
module.exports = List