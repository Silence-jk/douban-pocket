import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateList, updateDetail, updateQuery } from '../reducers/reducer'
import Search from '../components/Search'

class SearchContainer extends Component {
  handleChange (value) {
    if (this.props.onUpdateList) {
      this.props.onUpdateList(value)
    }
  }

  handleBack (value) {
    if (this.props.onUpdateDetail) {
      this.props.onUpdateDetail(value)
    }
  }

  handleQuery (value) {
    if (this.props.onUpdateQuery) {
      this.props.onUpdateQuery(value)
    }
  }

  render () {
    const {kind, isShowDetail, query} = this.props.datas
    return (
      <Search list={this.handleChange.bind(this)} kind={kind} isShowDetail={isShowDetail}
        detailStatus={this.handleBack.bind(this)}
        storeQuery={this.handleQuery.bind(this)}
        useQuery={query}
        />
    )
  }
}

Search.propTypes = {
  onUpdateList: PropTypes.func,
  onUpdateDetail: PropTypes.func,
  datas: PropTypes.object
}

const mapStateToProps = (state) => {
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
    },
    onUpdateQuery: (newQuery) => {
      dispatch(updateQuery(newQuery))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
