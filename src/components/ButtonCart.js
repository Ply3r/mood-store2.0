import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ButtonCart extends Component {
  render() {
    const { totalCart } = this.props;
    return (
      <Link
        to="/cart"
      >
        <div className="cart-button-container">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            <FaShoppingCart />
          </button>
          <p data-testid="shopping-cart-size">{ totalCart }</p>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = ({ totalCart }) => ({ totalCart })

export default connect(mapStateToProps, null)(ButtonCart);

ButtonCart.propTypes = {
  totalCart: PropTypes.number.isRequired,
};
