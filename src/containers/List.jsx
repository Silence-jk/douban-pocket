import React, {Component} from 'react'
import {connect} from 'react-redux'
import List from '../components/List'
class ListContainer extends Component {
  render () {
    let {list, kind} = this.props.datas
    return (
      <List list={list} kind={kind} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    datas: state.datas
  }
}
export default connect(mapStateToProps)(ListContainer)
