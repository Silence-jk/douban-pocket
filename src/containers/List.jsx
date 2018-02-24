import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateDetail} from '../reducers/reducer'
import List from '../components/List'
class ListContainer extends Component {
  handleDetailStatus (value) {
    this.props.onUpdateDetail(value)
    // console.log('status: ' + this.props.datas.isShowDetail);
  }

  render () {
    let {list, kind, isShowDetail} = this.props.datas
    return (
      <List list={list} kind={kind} isShowDetail={isShowDetail} detailStatus={this.handleDetailStatus.bind(this)}/>
    )
  }
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
