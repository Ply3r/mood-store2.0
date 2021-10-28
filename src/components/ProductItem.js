import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addToLocalStorage } from '../funcs';
import { FaCartPlus } from 'react-icons/fa'

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
    }
  }

  onMouseEnter = () => {
    this.setState({ showButton: true })
  }

  onMouseLeave = () => {
    this.setState({ showButton: false })
  }

  render() {
    const { showButton } = this.state;
    const {id, thumbnail, title, price, freeShipping, callback} = this.props;
    return (
      <Link key={ id } to={ `/product/${id}` } >
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

export default ProductItem;