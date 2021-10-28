import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cardProduct, setTotalItens } from '../funcs';
import { getProductsFromCategory, getProductsFromQuery } from '../services/api';
import { connect } from 'react-redux';
import { changeProducts, changeTotalItens } from '../actions';
import '../css/products.css'

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTotalItens: setTotalItens.bind(this),
    }
  }

  componentDidMount() {
    this.getProducts()
  }

  componentDidUpdate(Props) {
    const { catSelected, search } = this.props;
    if (Props.catSelected !== catSelected || Props.search !== search) {
      this.getProducts();
    }
  }

  getProducts = async () => {
    const { catSelected, changeProducts, search } = this.props;
    if (search) {
      const products = await getProductsFromQuery(search);
      changeProducts(products.results)
    } else {
      const products = await getProductsFromCategory(catSelected);
      changeProducts(products.results)
    }
  }

  render() {
    const { setTotalItens } = this.state;
    const { products } = this.props;
    return (
      <div className="products-container">
        <div className="flex-container">
          { products.length && cardProduct(products, setTotalItens)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products, search, catSelected }) => ({ products, search, catSelected })

const mapDispatchToProps = (dispatch) => ({
  changeProducts: (products) => dispatch(changeProducts(products)),
  changeTotalItens: (total) => dispatch(changeTotalItens(total))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string.isRequired,
  catSelected: PropTypes.string.isRequired,
  changeProducts: PropTypes.func.isRequired,
  changeTotalItens: PropTypes.func.isRequired,
};
