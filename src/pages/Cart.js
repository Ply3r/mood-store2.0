import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { getLocalStorageItens, removeItem } from '../funcs';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  deleteBtn = ({ target: { name } }) => {
    removeItem(name);
    const arrayOfProducts = getLocalStorageItens('cartItem');
    this.setState({ products: arrayOfProducts });
  }

  getProducts = async () => {
    const arrayOfProducts = await getLocalStorageItens('cartItem');
    if (arrayOfProducts !== null) {
      this.setState({ products: arrayOfProducts });
    }
  }

  cartItem = (products) => {
    const elemnts = products.map((produto) => (
      <div key={ produto.name }>
        <CartItem { ...produto } />
        <button type="button" name={ produto.name } onClick={ this.deleteBtn }>X</button>
      </div>
    ));
    return (
      <div>
        {elemnts}
        <Link to="/checkout">
          <button
            type="button"
            data-testid="checkout-products"
          >
            Finalizar Compra
          </button>
        </Link>
      </div>
    );
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        { products.length ? this.cartItem(products)
          : (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          ) }
      </div>
    );
  }
}

export default Cart;
