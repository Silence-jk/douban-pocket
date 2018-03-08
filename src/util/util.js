import React from 'react'

const util = {
  self: this,
  count: 10,
  bookCurr: '',
  bookCount: 10,
  movieCurr: '',
  movieCount: 10,
  musicCurr: '',
  musicCount: 10,
  getDefaultUrl: function (kind, count) {
    count = count || util.count
    switch (kind) {
      case 'book':
        return `https://api.douban.com/v2/book/search?q=${encodeURIComponent('腾讯')}&count=${count}`
      case 'movie':
        return `https://api.douban.com/v2/movie/top250?count=${count}`
      case 'music':
        return `https://api.douban.com/v2/music/search?q=${encodeURIComponent('许巍')}&count=$.count}`
      default:
        return `https://api.douban.com/v2/book/search?q=${encodeURIComponent('腾讯')}&count=${count}`
    }
  },
  /**
   * 获得当前页面的 url, 供刷新使用
   */
  getRefreshUrl: function (kind, q) {
    if (q === '') {
      return util.getDefaultUrl(kind)
    }
    switch (kind) {
      case 'book':
        return `https://api.douban.com/v2/book/search?q=${encodeURIComponent(q)}&count=${util.count}`
      case 'movie':
        return `https://api.douban.com/v2/movie/search?q=${encodeURIComponent(q)}&count=${util.count}`
      case 'music':
        return `https://api.douban.com/v2/music/search?q=${encodeURIComponent(q)}&count=${util.count}`
      default:
        return `https://api.douban.com/v2/book/search?q=${encodeURIComponent('腾讯')}&count=${util.count}`
    }
  },
  // 获得加载后面数据的url
  getLoadUrl: function (kind, q) {
    if (q === '') {
      return util.getDefaultUrl(kind, util.count++)
    }

    switch (kind) {
      case 'book':
        if (q === util.bookCurr) {
          util.bookCount += 10
        } else {
          util.bookCount = 10
          util.bookCurr = q
        }
        return `https://api.douban.com/v2/book/search?q=${encodeURIComponent(q)}&start=0&count=${util.bookCount}`
      case 'movie':
        if (q === util.movieCurr) {
          util.movieCount += 10
        } else {
          util.movieCount = 10
          util.movieCurr = q
        }
        return `https://api.douban.com/v2/movie/search?q=${encodeURIComponent(q)}&count=${util.movieCount}`
      case 'music':
        if (q === util.musicCurr) {
          util.musicCount += 10
        } else {
          util.musicCount = 10
          util.musicCurr = q
        }
        return `https://api.douban.com/v2/music/search?q=${encodeURIComponent(q)}&count=${util.musicCount}`
      default:
        return `https://api.douban.com/v2/book/search?q=${encodeURIComponent('腾讯')}&count=${util.bookCount}`
    }
  },
  getCount: function (q, curr, count) {
    if (q === curr) {
      count += 10
    } else {
      count = 10
      curr = q
    }
  },
  getTag (tagOrGenre, item) {
    let arr = []
    // console.log(item);
    item[tagOrGenre].map((tag, index) => {
      arr.push(<span key={index}>{tag.name ? tag.name : tag}</span>)
      arr.push('  ')
    })
    return arr
  }
}

module.exports = util
