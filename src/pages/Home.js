import React from 'react';
import { connect } from 'react-redux';
import { changeProducts, changeSearch } from '../actions';
import Header from '../components/Header';
import Products from '../components/Products';
import '../css/home.css'

class Home extends React.Component {
  handleSearch = ({ target: { value } }) => {
    const { changeSearch } = this.props;
    changeSearch(value)
  }

  render() {
    const { search } = this.props;
    return (
      <>
        <Header />
        <main>
          <h1 className="hero-title shop-title">Shop</h1>
          <div className="search-container">
            <div>
              <input
                placeholder="Procure um produto..."
                onChange={ this.handleSearch }
                value={ search }
                name="search"
                data-testid="query-input"
              />
            </div>
          </div>
        </main>
        <Products />
      </>
    );
  }
}

const mapStateToProps = ({ catSelected, totalProducts, search }) => ({ catSelected, totalProducts, search })

const mapDispatchToProps = (dispatch) => ({ 
  changeProducts: (products) => dispatch(changeProducts(products)),
  changeSearch: (search) => dispatch(changeSearch(search))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
