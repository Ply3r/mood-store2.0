import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeTotalItens } from '../actions';
import { setTotalItens } from '../funcs';

class ButtonCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTotalItens: setTotalItens.bind(this),
    }
  }

  componentDidMount() {
    const { setTotalItens } = this.state;
    setTotalItens();
  }

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

const mapDispatchToProps = (dispatch) => ({
  changeTotalItens: (total) => dispatch(changeTotalItens(total)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCart);

ButtonCart.propTypes = {
  totalCart: PropTypes.number.isRequired,
};
