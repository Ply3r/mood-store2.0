import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainTitle from './MainTItle';
import Categories from './Categories';
import ButtonCart from './ButtonCart';
import '../css/header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
    }
  }

  onMouseEnter = () => {
    this.setState({ showCart: true })
  }

  onMouseLeave = () => {
    this.setState({ showCart: false })
  }

  render() {
    const { showCart } = this.state;
    return (
      <>
        <header>
          <Link to="/">
            <div className="logo-container">
                <img src="https://ply3r.github.io/portifolio_antigo/projetos/loja_de_roupa/imagens/logo.jpeg" alt="logo" />
                <h2>Mood Store</h2>
            </div>
          </Link>
          <nav>
            <Link to="/">
              <h3>Home</h3>
            </Link>
            <div
              className="categories-header-container"
              onMouseEnter={ this.onMouseEnter }
            >
              <h3>Categorias</h3>
              <Categories
                onMouseLeave={ this.onMouseLeave }
                show={ showCart } 
              />
            </div>
            <Link to="/cart">
              <ButtonCart />
            </Link>
          </nav>
        </header>
        <MainTitle />
      </>
    )
  }
}

export default Header
