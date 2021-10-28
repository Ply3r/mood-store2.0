import React from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './components/ProductItem';

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
    const filteredArray = arrayOfProducts.filter(({ id }) => obj.id !== id)
    const jsonOfIds = JSON.stringify([...filteredArray, obj]);
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
  console.log(products)
  const elemnts = products
    .map(({
      id,
      title,
      price,
      thumbnail,
      shipping: { free_shipping: freeShipping }
    }) => (
      <ProductItem
        id={ id }
        title={ title }
        price={ price }
        thumbnail={ thumbnail }
        freeShipping={ freeShipping }
        callback={ callback }
      />
    ));
  return elemnts;
}
