import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { getProductsById } from '../services/api';
import { addToLocalStorage, setTotalItens } from '../funcs';
import FormFeedback from '../components/FormFeedback';
import { changeTotalItens } from '../actions';
import '../css/product.css';
import Rating from '../components/Rating';

class Product extends Component {
  constructor(prosp) {
    super(prosp);
    this.state = {
      title: '',
      price: 0,
      thumbnail: '',
      availableQuantity: 0,
      freeShipping: false,
      rating: 0,
      setTotalItens: setTotalItens.bind(this),
    };
  }

  componentDidMount() {
    const { setTotalItens } = this.state;
    this.getProduct();
    setTotalItens();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductsById([id]);
    const { body } = product[0]
    const {
      title,
      thumbnail,
      price,
      available_quantity: availableQuantity,
      shipping: { free_shipping: freeShipping }
    } = body;
    this.setState({ title, thumbnail, price, availableQuantity, freeShipping });
  }

  render() {
    const { title,
      thumbnail,
      price,
      availableQuantity,
      setTotalItens,
      freeShipping,
      rating,
    } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <>
        <Header />
        <div className="product-page">
          <div className="image-information-product-container">
            <div className="image-product-container">
              <img src={ thumbnail } alt={ title } />
            </div>
            <div className="information-product-container">
              <h1>{ title }</h1>
              { rating ? <Rating rating={ rating } /> : '' }
              <h2>{ `R$ ${price}` }</h2>
              <h3>{ `Em 12x de R$ ${ (price / 12).toFixed(2) }` }</h3>
              { freeShipping && <p className="frete">Frete Gratis</p>}
              <p>{ `Quantidade Disponivel: ${availableQuantity}` }</p>
              <button
                type="button"
                className="add-cart-bot-product"
                onClick={ () => {
                  addToLocalStorage({
                    id,
                    quantity: 1,
                  }, 'cartItem');
                  setTotalItens();
                } }
              >
                Add Cart
              </button>
            </div>
          </div>
          <FormFeedback id={ id } />
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeTotalItens: (total) => dispatch(changeTotalItens(total)),
});

export default connect(null, mapDispatchToProps)(Product);

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
