import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCart from '../components/ButtonCart';
import { getProductsById } from '../services/api';
import { addToLocalStorage, setTotalItens } from '../funcs';
import FormFeedback from '../components/FormFeedback';

class Product extends Component {
  constructor(prosp) {
    super(prosp);
    this.state = {
      title: '',
      price: 0,
      thumbnail: '',
      availableQuantity: 0,
      setTotal: setTotalItens.bind(this),
      totalProducts: 0,
    };
  }

  componentDidMount() {
    const { setTotal } = this.state;
    this.getProduct();
    setTotal();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const products = await getProductsById([id]);
    const { body } = products[0]
    const {
      title,
      thumbnail,
      price,
      available_quantity: availableQuantity,
    } = body;
    this.setState({ title, thumbnail, price, availableQuantity });
  }

  render() {
    const { title,
      thumbnail,
      price,
      availableQuantity,
      setTotal,
      totalProducts } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <>
        <ButtonCart total={ totalProducts } />
        <div>
          <h1 data-testid="product-detail-name">{ title }</h1>
          <img src={ thumbnail } alt={ title } />
          <p>{ `R$ ${price}` }</p>
          <p>{ `Quantidade Disponivel: ${availableQuantity}` }</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => {
              addToLocalStorage({
                name: title,
                maxQuantity: availableQuantity,
                price,
                quantity: 1,
              }, 'cartItem');
              setTotal();
            } }
          >
            Add Cart
          </button>
          <FormFeedback id={ id } />
        </div>
      </>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  category: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};

export default Product;
