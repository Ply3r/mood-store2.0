import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ButtonCart extends Component {
  render() {
    const { total } = this.props;
    return (
      <Link
        to="/cart"
      >
        <div>
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Carrinho de Compras
          </button>
          <p data-testid="shopping-cart-size">{ total }</p>
        </div>
      </Link>
    );
  }
}

export default ButtonCart;

ButtonCart.propTypes = {
  total: PropTypes.number.isRequired,
};
