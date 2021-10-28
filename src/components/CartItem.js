import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorageItens, addToLocalStorage, removeItem } from '../funcs';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      disabledAdd: false,
      disabledRemove: false,
    };
  }

  componentDidMount() {
    this.getQuantity();
  }

  getQuantity = () => {
    const { name } = this.props;
    const { quantity } = getLocalStorageItens('cartItem')
      .find((produto) => produto.name === name);
    this.setState({ quantity });
  }

  handleChange = ({ target: { name } }) => {
    const { maxQuantity } = this.props;
    const { quantity } = this.state;
    let disabledAdd = false;
    let disabledRemove = false;
    let quantidadeAtual = quantity;
    if (name === 'add') {
      if (quantity >= maxQuantity) {
        quantidadeAtual = maxQuantity;
        disabledAdd = true;
      } else {
        quantidadeAtual += 1;
      }
    } else if (name === 'remove') {
      if (quantity === 1) {
        quantidadeAtual = 1;
        disabledRemove = true;
      } else {
        quantidadeAtual -= 1;
      }
    }
    this.setState({
      quantity: quantidadeAtual,
      disabledAdd,
      disabledRemove }, this.addQuantityToLocalStorage);
  }

  addQuantityToLocalStorage = () => {
    const { quantity } = this.state;
    const { name } = this.props;
    const product = getLocalStorageItens('cartItem')
      .find((produto) => produto.name === name);
    product.quantity = quantity;
    removeItem(name);
    addToLocalStorage(product, 'cartItem');
  }

  render() {
    const { name, price } = this.props;
    const { quantity, disabledAdd, disabledRemove } = this.state;
    return (
      <div key={ name }>
        <h2 data-testid="shopping-cart-product-name">{ name }</h2>
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
        <p>{ price }</p>
        <button
          type="button"
          onClick={ this.handleChange }
          name="add"
          disabled={ disabledAdd }
          data-testid="product-increase-quantity"
        >
          +

        </button>
        <button
          type="button"
          onClick={ this.handleChange }
          name="remove"
          disabled={ disabledRemove }
          data-testid="product-decrease-quantity"
        >
          -

        </button>
      </div>
    );
  }
}

export default CartItem;

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  maxQuantity: PropTypes.number.isRequired,
};
