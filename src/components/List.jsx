import React, { Component } from 'react'
import Item from './Item'

class List extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { list, kind } = this.props
    let items
    switch (kind) {
      case 'book':
        items = list.books
        break
      case 'movie':
        items = list.subjects
        break
      case 'music':
        items = list.musics
        break
      default:
        items = list.books
        break
    }
    console.log('items: ' + items)

    return (
      <main className='container'>
        {
          items ? items.map((item, index) => {
            return <Item resultItem={item} key={item.id} id={item.id} kind={kind} />
          }) : ''
        }
      </main>
    )
  }
}

List.defaultProps = {
  list: []
}

module.exports = List
