import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorageItens, addToLocalStorage, removeItem, setTotalItens } from '../funcs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTotalItens } from '../actions';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      disabledAdd: false,
      disabledRemove: false,
      setTotalItens: setTotalItens.bind(this),
    };
  }

  componentDidMount() {
    const { setTotalItens } = this.state;
    this.getQuantity();
    setTotalItens();
  }

  getQuantity = () => {
    const { id, availableQuantity } = this.props;
    const { quantity } = getLocalStorageItens('cartItem')
      .find((produto) => produto.id === id);
    let disabledRemove = false;
    let disabledAdd = false;
    if (quantity <= 1) {
      disabledRemove = true;
    }
    if (quantity >= availableQuantity) {
      disabledAdd = true;
    };
    this.setState({ quantity, disabledAdd, disabledRemove });
  }

  handleChange = ({ target: { name } }) => {
    const { availableQuantity, getTotalPrice } = this.props;
    const { quantity } = this.state;
    let disabledAdd = false;
    let disabledRemove = false;
    let quantidadeAtual = quantity;
    if (name === 'add') {
      if (quantity >= availableQuantity) {
        quantidadeAtual = availableQuantity;
        disabledAdd = true;
      } else {
        quantidadeAtual += 1;
      }
    } else if (name === 'remove') {
      if (quantity <= 1) {
        quantidadeAtual = 1;
        disabledRemove = true;
      } else {
        quantidadeAtual -= 1;
        if (quantidadeAtual <= 1) {
          disabledRemove = true
        }
      }
    }
    this.setState({
      quantity: quantidadeAtual,
      disabledAdd,
      disabledRemove }, () => {
        this.addQuantityToLocalStorage();
        getTotalPrice();
      });
  }

  addQuantityToLocalStorage = () => {
    const { quantity, setTotalItens } = this.state;
    const { id } = this.props;
    const product = getLocalStorageItens('cartItem')
      .find((produto) => produto.id === id);
    product.quantity = quantity;
    removeItem(id);
    addToLocalStorage(product, 'cartItem');
    setTotalItens();
  }

  render() {
    const { title, price, thumbnail, deleteBtn, id, freeShipping } = this.props;
    const { quantity, disabledAdd, disabledRemove } = this.state;
    return (
      <div
        className="cartItem"
      >
        <Link to={`/product/${id}`}>
          <img src={ thumbnail } alt="product" />
          <div className="cartItem-title-container">
            <h4 data-testid="shopping-cart-product-name">{ title }</h4>
            { freeShipping && <p className="frete">Frete Gratis</p> }
            <button type="button" name={ id } onClick={ (event) => {
              event.preventDefault();
              deleteBtn(event)
            } }>Excluir</button>
          </div>
        </Link>
        <div className="quantity-container">
          <div>
            <button
              type="button"
              onClick={ this.handleChange }
              name="remove"
              disabled={ disabledRemove }
            >
              -
            </button>
            <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
            <button
              type="button"
              onClick={ this.handleChange }
              name="add"
              disabled={ disabledAdd }
            >
              +
            </button>
          </div>
        </div> 
        <h2>{ `R$ ${(price * quantity).toFixed(2)}` }</h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeTotalItens: (total) => dispatch(changeTotalItens(total))
});

export default connect(null, mapDispatchToProps)(CartItem);

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  availableQuantity: PropTypes.number.isRequired,
};
