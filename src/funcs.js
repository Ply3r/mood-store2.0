import React from 'react';
import { Link } from 'react-router-dom';

export function getInput({ target: { name, value } }) {
  this.setState({ [name]: value });
}

export function getLocalStorageItens(key) {
  const jsonOfIds = localStorage.getItem(key);
  return JSON.parse(jsonOfIds);
}

export function setTotalItens() {
  const { changeTotalItens } = this.props;
  const products = getLocalStorageItens('cartItem');
  if (!products) return;
  const totalProducts = products.reduce((acc, curr) => acc + curr.quantity, 0);
  changeTotalItens(totalProducts);
}

export function addToLocalStorage(obj, key) {
  const jsonItens = localStorage.getItem(key);
  if (jsonItens) {
    const arrayOfProducts = JSON.parse(jsonItens);
    const jsonOfIds = JSON.stringify([...arrayOfProducts, obj]);
    localStorage.setItem(key, jsonOfIds);
  } else {
    const jsonOfId = JSON.stringify([obj]);
    localStorage.setItem(key, jsonOfId);
  }
}

export function removeItem(name) {
  const arrayOfIds = getLocalStorageItens('cartItem');
  const arrayFiltered = arrayOfIds.filter((StorageID) => StorageID.name !== name);
  const jsonOfIds = JSON.stringify(arrayFiltered);
  localStorage.setItem('cartItem', jsonOfIds);
}

export function cardProduct(products, callback) {
  const elemnts = products
    .map(({ id, title, price, thumbnail, available_quantity: availableQuantity }) => (
      <div key={ id } id={ id } data-testid="product">
        <Link
          to={ `/product/${id}` }
          data-testid="product-detail-link"
        >
          <h2 data-testid="shopping-cart-product-name">{title}</h2>
        </Link>
        <img src={ thumbnail } alt={ title } />
        <p>
          {`R$: ${price} `}
        </p>
        <p data-testid="shopping-cart-product-quantity">
          {availableQuantity}
        </p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => {
            addToLocalStorage({
              id,
              quantity: 1,
            }, 'cartItem');
            callback();
          } }
        >
          Add Cart
        </button>
      </div>
    ));
  return elemnts;
}
