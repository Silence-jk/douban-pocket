import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import Detail from './Detail'

class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      detailList: {}
    }
  }

  handleDetail(value) {
    console.log('value:' + value);
    this.setState({
      detailList: value
    })
    this.props.detailStatus(true)
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
          this.props.isShowDetail ? <Detail kind={kind} detailList={this.state.detailList}/> :
          items ? items.map((item, index) => {
            return <Item resultItem={item} detail={this.handleDetail.bind(this)} key={item.id} id={item.id} kind={kind} />
          }) : ''
        }
      </main>
    )
  }
}

List.defaultProps = {
  list: []
}

List.propTypes = {
  detailStatus: PropTypes.func,
  list: PropTypes.object,
  kind: PropTypes.string,
  isShowDetail: PropTypes.bool
}

module.exports = List
