import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateList } from '../reducers/reducer'
import Search from '../components/Search'

class SearchContainer extends Component {
  constructor () {
    super()
  }

  handleChange (value) {
    if (this.props.onUpdateList) {
      this.props.onUpdateList(value)
    }
  }

  render () {
    console.log(this.props.datas)
    return (
      <Search list={this.handleChange.bind(this)} kind={this.props.datas.kind} />
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state: ' + state.datas)
  return {
    datas: state.datas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateList: (newList) => {
      dispatch(updateList(newList))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
