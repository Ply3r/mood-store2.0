import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { removeItem, getProducts, getTotalPrice } from '../funcs';
import { connect } from 'react-redux';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import '../css/cart.css'
import { changeTotalItens, changeTotalPrice } from '../actions';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      getProducts: getProducts.bind(this),
      getTotalPrice: getTotalPrice.bind(this),
    };
  }

  async componentDidMount() {
    const { getProducts, getTotalPrice } = this.state
    await getProducts();
    getTotalPrice();
  }

  deleteBtn = async ({ target: { name } }) => {
    const { getProducts, getTotalPrice } = this.state
    removeItem(name);
    await getProducts();
    getTotalPrice();
  }

  cartItem = (products) => {
    const { getTotalPrice } = this.state;
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
          getTotalPrice={ getTotalPrice }
        />
    ));
    return elemnts;
  }

  render() {
    const { products } = this.state;
    const { totalPrice } = this.props;
    return (
      <>
        <Header />
        <div className="cart-page">
            <div className="cart-title-container">
              <h1 className="hero-title">Carrinho</h1>
            </div>
          <div class="cart-container">
            <div className="cartItens-container">
              { products.length ? this.cartItem(products) : <p>Seu carrinho está vazio!</p> }
            </div>
            <h2 className="total-price">{ `Total: R$ ${totalPrice.toFixed(2)}` }</h2>
          </div>
          <Link to="/mood-store2.0/checkout">
            <button
              disabled={ !products.length }
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
  changeTotalItens: (total) => dispatch(changeTotalItens(total)),
  changeTotalPrice: (price) => dispatch(changeTotalPrice(price)),
});

const mapStateToProps = ({ totalPrice }) => ({ totalPrice });

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
