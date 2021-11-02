import React, { Component } from 'react';
import Form from '../components/Form';
import { connect } from 'react-redux';
import { getProducts, getQuantityById, getTotalPrice } from '../funcs';
import { changeTotalItens, changeTotalPrice } from '../actions';
import '../css/checkout.css';
import Header from '../components/Header';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      getProducts: getProducts.bind(this),
      getTotalPrice: getTotalPrice.bind(this),
    };
  }

  async componentDidMount() {
    const { getProducts, getTotalPrice } = this.state;
    await getProducts();
    getTotalPrice();
  }

  mapProducts = () => {
    const { products } = this.state;
    const elemnts = products
      .map(({ body: { title, price, id, thumbnail, shipping: { free_shipping: freeShipping } } }) => {
        const quantity = getQuantityById(id);
        return (
          <div className="cartItem" key={ title }>
            <img src={ thumbnail } alt="item" />
            <div className="cartItem-title-container checkout-title-container">
              <h4>{ title }</h4>
              { freeShipping && <p className="frete">Frete Gratis</p>}
              <p>{ `Quantidade: ${quantity}` }</p>
            </div>
            <h4>{ `R$ ${price.toFixed(2)}` }</h4>
          </div>
        )
    });
    return elemnts;
  }

  apagarItens = async () => {
    const array = JSON.stringify([])
    localStorage.setItem('cartItem', array)
    changeTotalItens(0)
    changeTotalPrice(0)
  }

  render() {
    const { products } = this.state;
    const { totalPrice } = this.props;
    return (
      <>
        <Header />
        <div className="page-checkout">
          <h1 className="hero-title">Checkout</h1>
          <div className="checkout-info-container">
            <div className="checkout-products-container">
              { !!products.length && this.mapProducts() }
            </div>
            <h2 className="checkout-total-price">{ !!products.length && `Total: R$ ${totalPrice.toFixed(2)}` }</h2>
          </div>
          <Form
            apagarItens={ this.apagarItens }
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ totalPrice }) => ({ totalPrice })

const mapDispatchToProps = (dispatch) => ({
  changeTotalItens: (total) => dispatch(changeTotalItens(total)),
  changeTotalPrice: (price) => dispatch(changeTotalPrice(price)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
