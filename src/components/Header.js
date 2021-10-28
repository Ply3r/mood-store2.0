import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

class Header extends Component {
  render() {
    return (
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
          <Link to="/cart">
            <h3>Carrinho</h3>
          </Link>
        </nav>
      </header>
    )
  }
}

export default Header
