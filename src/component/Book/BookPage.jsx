import React, {Component} from 'react'
import Page from '../../common/Page'

class BookPage extends Component {
  constructor ({match}) {
    super()
    this.state = {
      kind: match.path,
      url: `https://api.douban.com/v2/book/search?q=${encodeURIComponent('腾讯')}&count=10`
    }
  }

  render () {
    const {kind, url} = this.state
    return (
      <Page kind={kind} url={url} />
    )
  }
}

export default BookPage
