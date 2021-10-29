import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export default class ReviewCard extends Component {
  loadReviews = () => {
    const { reviews } = this.props;
    const elements = reviews.map(({ userEmail, userRating, userText }) => {
      let stars = [];
      for(let c = 0; c < 5; c += 1) {
        stars.push(
          c < Number(userRating) ? <AiFillStar /> : <AiOutlineStar />
        )
      }
      return (
        <div key={ userEmail }>
          <div className="review-rate-container">
            { stars }
          </div>
          <h2>{userEmail}</h2>
          
          <p>{userText}</p>
        </div>
      )
    })
    return elements;
  }

  render() {
    const { reviews } = this.props;
    return (
      <div className="avaliacoes">
        <h1>Avaliações: </h1>
        {reviews.length && this.loadReviews()}
      </div>
    );
  }
}

ReviewCard.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(
    {
      userEmail: PropTypes.string,
      userRating: PropTypes.string,
      userText: PropTypes.string,
      productId: PropTypes.string,
    },
  )).isRequired,
};
