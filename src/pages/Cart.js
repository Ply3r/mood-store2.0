import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { getProductsById } from '../services/api'; 
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
    this.getProducts()
  }

  getProducts = async () => {
    const arrayOfProducts = await getLocalStorageItens('cartItem');
    if (arrayOfProducts !== null) {
      const ids = arrayOfProducts.reduce((acc, { id }) => {
        acc.push(id)
        return acc
      }, [])
      const products = await getProductsById(ids);
      this.setState({ products })
    }
  }

  cartItem = (products) => {
    console.log(products)
    const elemnts = products.map(({ body: { title, available_quantity: availableQuantity, id, price } }) => (
      <div key={ title }>
        <CartItem
          price={ price }
          id={ id }
          title={ title }
          availableQuantity={ availableQuantity }
        />
        <button type="button" name={ id } onClick={ this.deleteBtn }>X</button>
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
