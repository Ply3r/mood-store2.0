import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';

class Rating extends Component {
  render() {
    const { rating } = this.props;
    let stars = [];
    for(let c = 0; c < rating; c += 1) {
      stars.push(<FaStar />)
    }
    return (
      <div className="star-container">
        { stars }
      </div>
    );
  }
}

export default Rating;
