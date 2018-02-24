import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import Tab from '../components/Tab'
import {updateKind, updateList, updateDetail} from '../reducers/reducer'

class TabContainer extends Component {
  handleChange (value, kind) {
    console.log('value: ' + value)
    console.log('kind: ' + kind)

    this.props.updateList(value)
    this.props.updateKind(kind)
    
  }

  render () {
    return (
      this.props.datas.isShowDetail ? null :
      <Tab result={this.handleChange.bind(this)} />
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
    updateKind: (newKind) => {
      dispatch(updateKind(newKind))
    },
    updateList: (newList) => {
      dispatch(updateList(newList))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabContainer)
