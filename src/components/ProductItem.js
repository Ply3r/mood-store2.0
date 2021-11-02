import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToLocalStorage, getLocalStorageItens, removeItem, setTotalItens } from '../funcs';
import { changeTotalItens } from '../actions';
import { FaCartPlus } from 'react-icons/fa'
import { BsCartCheckFill } from "react-icons/bs";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inCart: false,
      showButton: false,
      setTotalItens: setTotalItens.bind(this)
    }
  }

  componentDidMount() {
    this.isProductInCart();
  }

  isProductInCart = () => {
    const { id } = this.props
    const cartItens = getLocalStorageItens('cartItem');
    if (!cartItens) return;
    const product = cartItens.find((product) => product.id === id);
    if (product) {
      this.setState({ inCart: true, showButton: false })
    }
  }

  onMouseEnter = () => {
    const { inCart } = this.state;
    if (!inCart) {
      this.setState({ showButton: true })
    }
  }

  onMouseLeave = () => {
    const { inCart } = this.state;
    if (!inCart) {
      this.setState({ showButton: false })
    }
  }

  addItemCart = () => {
    this.setState({ inCart: true, showButton: false })
  }

  removeItemCart = (id) => {
    const { setTotalItens } = this.state;
    removeItem(id);
    setTotalItens();
    this.setState({ inCart: false, showButton: true })
  }

  render() {
    const { showButton, inCart } = this.state;
    const {id, thumbnail, title, price, freeShipping, callback} = this.props;
    return (
      <Link key={ id } to={ `/mood-store2.0/product/${id}` } >
        <div
          onMouseLeave={ this.onMouseLeave }
          onMouseEnter={ this.onMouseEnter }
          className="product"
          id={ id }
        >
          <img src={ thumbnail } alt={ title } />
          <div className="product-information">
            <h2>{`R$: ${price} `}</h2>
            <p>12x de R${ (price / 12).toFixed(2) }</p>
            { freeShipping && <p className="frete">Frete Gratis</p>}
            <p>{title}</p>
          </div>
          { inCart && 
          <button
            type="button"
            onClick={ (event) => {
              event.preventDefault();
              this.removeItemCart(id)
            }}
          >
            <BsCartCheckFill />
          </button> }
          { showButton && 
            <button
            type="button"
            onClick={ (event) => {
              event.preventDefault();
              addToLocalStorage({
                id,
                quantity: 1,
              }, 'cartItem');
              callback();
              this.addItemCart();
            } }
            >
              <FaCartPlus />
            </button>
          }
        </div>
      </Link>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeTotalItens: (total) => dispatch(changeTotalItens(total))
})

export default connect(null, mapDispatchToProps)(ProductItem)