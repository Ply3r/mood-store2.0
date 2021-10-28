import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard';
import { addToLocalStorage, getLocalStorageItens, getInput } from '../funcs';

export default class FormFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      rating: '',
      text: '',
      reviews: [],
      handleChange: getInput.bind(this),
    };
  }

  componentDidMount() {
    this.loadReviews();
  }

  loadReviews = () => {
    const { id } = this.props;
    const reviews = getLocalStorageItens('review');
    if (!reviews) return;
    const filteredReviews = reviews.filter(({ productId }) => productId === id);

    this.setState({ reviews: filteredReviews });
  }

  saveReview() {
    const { email, rating, text } = this.state;
    const { id } = this.props;
    const review = {
      userEmail: email,
      userRating: rating,
      userText: text,
      productId: id,
    };
    addToLocalStorage(review, 'review');
  }

  render() {
    const { rating, reviews, handleChange } = this.state;
    return (
      <>
        <form>
          <p>Avaliação do produto</p>
          <input
            onChange={ handleChange }
            name="email"
            type="email"
            placeholder="Email"
          />
          <label htmlFor="rating">
            <input
              checked={ rating === '1' }
              onChange={ handleChange }
              type="radio"
              name="rating"
              value="1"
            />
            1

          </label>
          <label htmlFor="rating">
            <input
              checked={ rating === '2' }
              onChange={ handleChange }
              type="radio"
              name="rating"
              value="2"
            />
            2

          </label>
          <label htmlFor="rating">
            <input
              checked={ rating === '3' }
              onChange={ handleChange }
              type="radio"
              name="rating"
              value="3"
            />
            3

          </label>
          <label htmlFor="rating">
            <input
              checked={ rating === '4' }
              onChange={ handleChange }
              type="radio"
              name="rating"
              value="4"
            />
            4

          </label>
          <label htmlFor="rating">
            <input
              checked={ rating === '5' }
              onChange={ handleChange }
              type="radio"
              name="rating"
              value="5"
            />
            5

          </label>
          <div>
            <textarea
              type="text"
              name="text"
              placeholder="Mensagem (opcional)"
              data-testid="product-detail-evaluation"
              onChange={ handleChange }
            />

          </div>
          <button type="button" onClick={ this.saveReview }>Avaliar</button>

        </form>
        <ReviewCard reviews={ reviews } />
      </>
    );
  }
}

FormFeedback.propTypes = {
  id: PropTypes.string.isRequired,
};
