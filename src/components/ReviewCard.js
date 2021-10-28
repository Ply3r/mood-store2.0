import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ReviewCard extends Component {
  loadReviews = () => {
    const { reviews } = this.props;

    const elements = reviews.map(({ userEmail, userRating, userText }) => (
      <div key={ userEmail }>
        <p>{userEmail}</p>
        <p>
          Avaliação:
          {userRating}
        </p>
        <p>{userText}</p>
      </div>
    ));
    return elements;
  }

  render() {
    const { reviews } = this.props;
    return (
      <div>
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
