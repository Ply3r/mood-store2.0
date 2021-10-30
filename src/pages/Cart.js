import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsById } from '../services/api'; 
import { getLocalStorageItens, removeItem } from '../funcs';
import { connect } from 'react-redux';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import '../css/cart.css'
import { changeTotalItens } from '../actions';

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
    const { changeTotalItens } = this.props
    const arrayOfProducts = await getLocalStorageItens('cartItem');
    if (arrayOfProducts !== null) {
      const ids = arrayOfProducts.reduce((acc, { id }) => {
        acc.push(id)
        return acc
      }, [])
      const products = await getProductsById(ids);
      changeTotalItens(products.length)
      this.setState({ products })
    }
  }

  cartItem = (products) => {
    const elemnts = products.map(({ body: { 
      title,
      available_quantity: availableQuantity,
      shipping: { free_shipping: freeShipping },
      id,
      price,
      thumbnail 
    } }) => (
        <CartItem
          key={ title }
          thumbnail={ thumbnail }
          price={ price }
          id={ id }
          title={ title }
          availableQuantity={ availableQuantity }
          freeShipping={ freeShipping }
          deleteBtn={ this.deleteBtn }
        />
    ));
    return elemnts;
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <Header />
        <div className="cart-page">
          <div className="cart-title-container">
            <h1 className="hero-title">Carrinho</h1>
          </div>
          <div className="cartItens-container">
            { products.length ? this.cartItem(products) : <p>Seu carrinho está vazio!</p> }
          </div>
          <Link to="/checkout">
            <button
              type="button"
              className="checkout-products"
            >
              Finalizar Compra
            </button>
          </Link>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeTotalItens: (total) => dispatch(changeTotalItens(total))
});

export default connect(null, mapDispatchToProps)(Cart);
