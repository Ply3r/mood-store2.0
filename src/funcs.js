import React from 'react';
import ProductItem from './components/ProductItem';
import { getProductsById } from './services/api'; 
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export function getInput({ target: { name, value } }) {
  this.setState({ [name]: value });
}

export function getLocalStorageItens(key) {
  const jsonOfIds = localStorage.getItem(key);
  return JSON.parse(jsonOfIds);
}

export async function getProducts() {
  const { changeTotalItens } = this.props
  const arrayOfProducts = await getLocalStorageItens('cartItem');
  if (arrayOfProducts === null) return;
  const ids = arrayOfProducts.reduce((acc, { id }) => {
    acc.push(id)
    return acc
  }, [])
  const products = await getProductsById(ids);
  changeTotalItens(products.length)
  this.setState({ products })
}

export function getTotalPrice() {
  const { changeTotalPrice } = this.props;
  const { products } = this.state;
  if (!products.length) {
    changeTotalPrice(0)
    return;
  }
  const totalPrice = products.reduce((acc, { body: { id, price } }) => {
    const quantity = getQuantityById(id);
    const total = (price * quantity) + acc;
    return total;
  }, 0);
  changeTotalPrice(totalPrice);
}

export function getQuantityById(id) {
  const arrayOfIds = getLocalStorageItens('cartItem');
  const { quantity } = arrayOfIds.find((product) => product.id === id);
  return quantity;
}


export function setTotalItens() {
  const { changeTotalItens } = this.props;
  const products = getLocalStorageItens('cartItem');
  if (!products) return;
  const totalProducts = products.reduce((acc, curr) => acc + curr.quantity, 0);
  changeTotalItens(totalProducts);
}

export function saveRating({ target }) {
  const { value } = target.closest('button')
  this.setState({ rating: value })
}

export function stars(callback) {
  const { rating } = this.state;
  let ratingButtons = [];
  for(let c = 0; c < 5; c += 1) {
    ratingButtons.push(
      <button
        key={`rateButton${c + 1}`}
        onClick={ (event) => {
          event.preventDefault();
          callback(event);
        } }
        value={c + 1}
      >
        { rating > c ? <AiFillStar /> : <AiOutlineStar /> }
      </button>
    )
  }
  return ratingButtons;
}

export function addToLocalStorage(obj, key) {
  const jsonItens = localStorage.getItem(key);
  if (jsonItens) {
    const arrayOfProducts = JSON.parse(jsonItens);
    let filteredArray = arrayOfProducts.filter(({ id }) => obj.id !== id);
    if (key === 'review') {
      filteredArray = arrayOfProducts.filter(({ userEmail }) => obj.userEmail !== userEmail);
    }
    const jsonOfIds = JSON.stringify([...filteredArray, obj]);
    localStorage.setItem(key, jsonOfIds);
  } else {
    const jsonOfId = JSON.stringify([obj]);
    localStorage.setItem(key, jsonOfId);
  }
}

export function removeItem(id) {
  const arrayOfIds = getLocalStorageItens('cartItem');
  const arrayFiltered = arrayOfIds.filter((StorageID) => StorageID.id !== id);
  const jsonOfIds = JSON.stringify(arrayFiltered);
  localStorage.setItem('cartItem', jsonOfIds);
}

export function cardProduct(products, callback) {
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
