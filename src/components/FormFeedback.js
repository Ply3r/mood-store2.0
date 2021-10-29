import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard';
import { addToLocalStorage, getLocalStorageItens, getInput, stars, saveRating } from '../funcs';

export default class FormFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      rating: 0,
      text: '',
      reviews: [],
      handleChange: getInput.bind(this),
      stars: stars.bind(this),
      saveRating: saveRating.bind(this),
    };
  }

  componentDidMount() {
    this.loadReviews();
  }

  loadReviews = () => {
    const { id } = this.props;
    const reviews = getLocalStorageItens('review');
    if (!reviews) return;
    const filteredReviews = reviews.filter((review) => review.id === id);
    this.setState({ reviews: filteredReviews });
  }

  saveReview() {
    const { email, rating, text } = this.state;
    const { id } = this.props;
    const review = {
      userEmail: email,
      userRating: rating,
      userText: text,
      id,
    };
    addToLocalStorage(review, 'review');
    this.loadReviews();
  }

  render() {
    const { stars, saveRating, reviews, email, handleChange } = this.state;
    
    return (
      <>
        <form className="form-container">
          <h1>Avaliação do produto</h1>
          <input
            className="email"
            onChange={ handleChange }
            name="email"
            type="email"
            value={ email }
            placeholder="Digite seu email..."
          />
          <h3>Digite sua avaliação do produto</h3>
          <div className="avaliation-container">
            { stars(saveRating) }
          </div>
          <h3>Descrição do produto:</h3>
          <textarea
            type="text"
            name="text"
            placeholder="Mensagem (opcional)"
            data-testid="product-detail-evaluation"
            onChange={ handleChange }
          />     
          <button
            type="button"
            className="add-cart-bot-product review-bot"
            onClick={ (event) => {
              event.preventDefault();
              this.saveReview();
            } }
          >
            Avaliar
          </button>
          { !!reviews.length && <ReviewCard reviews={ reviews } /> }
        </form>
      </>
    );
  }
}

FormFeedback.propTypes = {
  id: PropTypes.string.isRequired,
};
