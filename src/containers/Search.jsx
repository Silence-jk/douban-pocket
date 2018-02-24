import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateList, updateDetail } from '../reducers/reducer'
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

  handleBack (value) {
    console.log('value status: ' + value);
    
    if (this.props.onUpdateDetail) {
      this.props.onUpdateDetail(value)
    }
  }

  render () {
    console.log(this.props.datas)
    const {kind, isShowDetail} = this.props.datas
    return (
      <Search list={this.handleChange.bind(this)} kind={kind} isShowDetail={isShowDetail} detailStatus={this.handleBack.bind(this)}/>
    )
  }
}

Search.propTypes = {
  onUpdateList: PropTypes.func,
  datas: PropTypes.object
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
    },
    onUpdateDetail: (newDetailStatus) => {
      dispatch(updateDetail(newDetailStatus))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
