import React from 'react';
import { connect } from 'react-redux';
import { changeProducts } from '../actions';
import Header from '../components/Header';
import MainTitle from '../components/MainTItle';
import Categories from '../components/Categories';
import ButtonCart from '../components/ButtonCart';
import Products from '../components/Products';
import '../css/home.css'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  

  handleSearch = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.getProducts('query'))
  }

  render() {
    const { search, totalProducts } = this.props;
    return (
      <>
        <Header />
        <MainTitle />
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
          <ButtonCart total={ totalProducts } />
        </main>
        <Categories />
        <Products />
      </>
    );
  }
}

const mapStateToProps = ({ catSelected, totalProducts }) => ({ catSelected, totalProducts })

const mapDispatchToProps = (dispatch) => ({ 
  changeProducts: (products) => dispatch(changeProducts(products)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
