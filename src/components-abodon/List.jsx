import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Refresh from './Refresh'
import Item from './Item'
import Detail from './Detail'

class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      detailList: {}
    }
  }

  componentDidMount () {

  }

  handleDetail (value) {
    this.setState({
      detailList: value
    })
    this.props.detailStatus(true)
  }

  handleRefreshList (value) {
    this.props.refreshList(value)
  }

  render () {
    const { list, kind, query } = this.props
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

    return (
      <main className='container' id='main'>
        <Refresh kind={kind} query={query} refreshList={this.handleRefreshList.bind(this)} />
        {
          this.props.isShowDetail ? <Detail kind={kind} detailList={this.state.detailList} />
          : items ? items.map((item, index) => {
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
