import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cardProduct } from '../funcs';
import { getProductsFromCategory, getProductsFromQuery } from '../services/api';
import { connect } from 'react-redux';
import { changeProducts } from '../actions';

class Products extends Component {
  componentDidMount() {
    this.getProducts()
  }

  componentDidUpdate(Props) {
    const { catSelected } = this.props;
    if (Props.catSelected !== catSelected) {
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
    const { products, getTotalItens } = this.props;
    return (
      <div>
        { products.length && cardProduct(products, getTotalItens)}
      </div>
    );
  }
}

const mapStateToProps = ({ products, search, catSelected }) => ({ products, search, catSelected })

const mapDispatchToProps = (dispatch) => ({
  changeProducts: (products) => dispatch(changeProducts(products))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  getTotalItens: PropTypes.func.isRequired,
};
