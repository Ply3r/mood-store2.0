import React, { Component } from 'react';
import loadingImg from '../images/loading.gif'

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <img src={ loadingImg } alt="loading" />
      </div>
    )
  }
}

export default Loading