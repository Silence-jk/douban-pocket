import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Tab from '../components/Tab'
import {updateKind, updateList, updateQuery} from '../reducers/reducer'

class TabContainer extends Component {
  handleChange (value, kind, query) {
    this.props.onUpdateList(value)
    this.props.onUpdateKind(kind)
    this.props.onUpdateQuery(query)
  }

  render () {
    const {kind} = this.props.datas
    return (
      this.props.datas.isShowDetail ? null
      : <Tab result={this.handleChange.bind(this)} kind={kind} />
    )
  }
}

TabContainer.propTypes = {
  updateList: PropTypes.func,
  updateKind: PropTypes.func,
  datas: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    datas: state.datas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateKind: (newKind) => {
      dispatch(updateKind(newKind))
    },
    onUpdateList: (newList) => {
      dispatch(updateList(newList))
    },
    onUpdateQuery: (newQuery) => {
      dispatch(updateQuery(newQuery))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabContainer)
