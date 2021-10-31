import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsById } from '../services/api'; 
import { getLocalStorageItens, removeItem } from '../funcs';
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
    };
  }

  async componentDidMount() {
    await this.getProducts();
    await this.getTotalPrice();
  }

  deleteBtn = async ({ target: { name } }) => {
    removeItem(name);
    await this.getProducts();
    await this.getTotalPrice();
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
          getTotalPrice={ this.getTotalPrice }
        />
    ));
    return elemnts;
  }

  getTotalPrice = async () => {
    const { changeTotalPrice } = this.props;
    const { products } = this.state;
    const arrayOfIds = await getLocalStorageItens('cartItem');
    if (!products.length) {
      changeTotalPrice(0)
      return;
    }
    const totalPrice = products.reduce((acc, { body }) => {
      const { quantity } = arrayOfIds.find(({ id }) => body.id === id);
      const price = (body.price * quantity) + acc;
      return price;
    }, 0);
    changeTotalPrice(totalPrice);
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
          <Link to="/checkout">
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
