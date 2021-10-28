import React, { Component } from 'react';
import Form from '../components/Form';
import { getLocalStorageItens } from '../funcs';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    const products = getLocalStorageItens('cartItem');
    this.setState({ products });
  }

  mapProducts = () => {
    const { products } = this.state;
    const elemnts = products.map(({ name, price, quantity }) => (
      <div key={ name }>
        <h2>{ name }</h2>
        <p>{ price }</p>
        <p>{ quantity }</p>
      </div>
    ));
    return elemnts;
  }

  getTotalPrice = () => {
    const { products } = this.state;
    const total = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    return total;
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <div>
          { products.length && this.mapProducts() }
          <p>{ products.length && `Total: ${this.getTotalPrice()}` }</p>
        </div>
        <Form />
      </>
    );
  }
}

export default Checkout;
