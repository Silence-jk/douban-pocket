import React, {Component} from 'react'
import {connect} from 'react-redux'
import Tab from '../components/Tab'
import { updateKind, updateList } from '../reducers/reducer'

class TabContainer extends Component {
  handleChange (value, kind) {
    console.log('value: ' + value)
    console.log('kind: ' + kind)

    this.props.updateList(value)
    this.props.updateKind(kind)
  }

  render () {
    return (
      <Tab result={this.handleChange.bind(this)} />
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
    updateKind: (newKind) => {
      dispatch(updateKind(newKind))
    },
    updateList: (newList) => {
      dispatch(updateList(newList))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabContainer)
