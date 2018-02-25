import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateDetail, updateList} from '../reducers/reducer'
import List from '../components/List'
class ListContainer extends Component {
  handleDetailStatus (value) {
    this.props.onUpdateDetail(value)
  }

  handleRefreshList(value) {
    this.props.onUpdateList(value)
  }

  render () {
    let {list, kind, isShowDetail, query} = this.props.datas
    return (
      <List list={list} kind={kind} isShowDetail={isShowDetail} query={query}
        detailStatus={this.handleDetailStatus.bind(this)}
        refreshList={this.handleRefreshList.bind(this)}
        /> 
    )
  }
}

ListContainer.propTypes = {
  datas: PropTypes.object,
  onUpdateDetail: PropTypes.func
}
const mapStateToProps = (state) => {
  return {
    datas: state.datas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateDetail: (newDeatilStatus) => {
      dispatch(updateDetail(newDeatilStatus))
    },
    onUpdateList: (newList) => {
      dispatch(updateList(newList))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
