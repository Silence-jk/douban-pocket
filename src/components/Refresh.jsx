import React, { Component } from 'react'
import util, {getRefreshUrl, getLoadUrl} from '../util/util'
import fetchJsonp from 'fetch-jsonp'

class Refresh extends Component {
  constructor() {
    super()
    this.state = {
      _start: 0,
      _end: 0
    }
  }
  
  componentDidMount() {
    const id = this.div.parentNode.id;
    this.kt_touch(id, 'y')
  }

  slideDownStep1(dist) {
    const sd1 = document.getElementById("sd1"),
    sd2 = document.getElementById("sd2");
    sd2.style.display = "none";
    sd1.style.display = "block";
    sd1.style.height = 1 - parseInt(dist) + "px";
  }

  slideDownStep2() {
    const sd1 = document.getElementById("sd1"),
    sd2 = document.getElementById("sd2");
    sd1.style.display = "none";
    sd1.style.height = "20px";
    sd2.style.display = "block";
  }

  slideDownStep3() {
    var sd1 = document.getElementById("sd1"),
      sd2 = document.getElementById("sd2");
    sd1.style.display = "none";
    sd2.style.display = "none";
  }

  touchStart(way, event) {
    let {_start} = this.state;
    event.preventDefault();
    if (!event.touches.length) return;
    var touch = event.touches[0];
    if (way == "x") {
      _start = touch.pageX;
    } else {
      _start = touch.pageY;
    }
    this.setState({_start})
  }

  touchMove(way, event) {
    let {_start, _end} = this.state
    event.preventDefault();
    if (!event.touches.length) return;
    var touch = event.touches[0];

    if (way == "x") {
      _end = (_start - touch.pageX);
    } else {
      _end = (_start - touch.pageY);
      if (_end < 0) {
        this.slideDownStep1(_end);
      }
    }
    this.setState({_end})
  }

  touchEnd(way, event) {
    let {_end} = this.state
    console.log('_end....' + _end);
    if (_end > 0) {
      //左滑或上滑
      this.slideDownStep2();
      const url = getLoadUrl(this.props.kind, this.props.query)
      fetchJsonp(url, {
        timeout: 3000
      }).then((response) => {
        return response.json()
      }).then((json) => {
        this.props.refreshList(json)
        this.slideDownStep3();
        return json
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    } else {
      this.slideDownStep2();
      const url = getRefreshUrl(this.props.kind, this.props.query)
      fetchJsonp(url, {
        timeout: 3000
      }).then((response) => {
        return response.json()
      }).then((json) => {
        this.props.refreshList(json)
        this.slideDownStep3();
        return json
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    }
  }

  kt_touch(contentId, way) {
      const _content = document.getElementById(contentId);
      _content.addEventListener("touchstart", this.touchStart.bind(this, way), false);
      _content.addEventListener("touchmove", this.touchMove.bind(this, way), false);
      _content.addEventListener("touchend", this.touchEnd.bind(this, way), false);
  }

  render() {
    return (
      <div id="sd" ref={div => this.div = div}>
        <div id="sd1">
          <p>松开后刷新</p>
        </div>
        <div id="sd2">
          <p>
            玩命加载中......
          </p>
        </div>
      </div>
    )
  }
}

module.exports = Refresh