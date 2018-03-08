import React, { Component } from 'react'
import { getLoadUrl } from '../util/util'
import fetchJsonp from 'fetch-jsonp'

class LoadMore extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  _loadMoreData () {
    const url = getLoadUrl(this.props.kind, this.props.query)
    fetchJsonp(url, {
      timeout: 3000
    }).then((response) => {
      return response.json()
    }).then((json) => {
      this.props.refreshList(json)
      this.setState({ loading: false })
      return json
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  componentDidMount () {
    const wrapper = this.refs.wrapper
    let timeoutId
    let self = this
    function callback () {
      const top = wrapper.getBoundingClientRect().top
      const windowHeight = window.screen.height

      if (top && top < windowHeight) {
        self.setState({loading: true})
        self._loadMoreData()
      }
    }

    window.addEventListener('scroll', function () {
      if(self.props.isLoadFinish) {
        return 
      }
      
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(callback, 50)
    }, false)
  }

  render () {
    return (
      <div className='load-more' ref='wrapper'>
        {
          this.state.loading
            ?  <span style={{color: '#fff'}}>加载中...</span>
            : ''
        }
      </div>
    )
  }
}

export default LoadMore
