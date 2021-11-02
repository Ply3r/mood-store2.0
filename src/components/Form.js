import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getInput } from '../funcs';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      pagamento: 'boleto',
      handleChange: getInput.bind(this),
    };
  }

  makeInputs = () => {
    const { fullname, email, cpf, phone, cep, address } = this.state;
    const obj = { fullname, email, cpf, phone, cep, address }
    const { handleChange } = this.state;
    const keys = Object.keys(obj);
    const elements = keys.map((key) => {
      const { [key]: value } = this.state;
      return (
        <label key={ key } htmlFor={ key }>
          { `${key}:` }
          <input
            id={ key }
            name={ key }
            value={ value }
            onChange={ handleChange }
            data-testid={ `checkout-${key}` }
          />
        </label>
      );
    });
    return elements;
  }

  render() {
    const { apagarItens } = this.props;
    const { pagamento, handleChange } = this.state
    return (
      <form className="form-container checkout-form">
        { this.makeInputs() }
        <div className="radio-containers">
          <label htmlFor="boleto">
            <img alt="boleto" src="data:image/png;base64,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" />
            <input 
              id="boleto"
              type="radio"
              name="pagamento"
              value="boleto"
              onChange={ handleChange }
              checked={ pagamento === 'boleto' }
            />
          </label>
          <label htmlFor="mastercard">
            <img alt="mastercard" src="https://www.cartaoacredito.com/wp-content/uploads/2019/01/MasterCard-tira-nome-da-logomarca.jpeg" />
            <input 
              id="mastercard"
              type="radio"
              name="pagamento"
              value="mastercard"
              onChange={ handleChange }
              checked={ pagamento === 'mastercard' }
            />
          </label>
          <label htmlFor="visa">
            <img alt="visa" src="https://www.visa.com.br/content/dam/VCOM/regional/lac/brazil/media-kits/images/icone-substituicao-emergencial-de-cartao-800x640.jpg" />
            <input 
              id="visa"
              type="radio"
              name="pagamento"
              value="visa"
              onChange={ handleChange }
              checked={ pagamento === 'visa' }
            />
          </label>
          <label htmlFor="paypal">
            <img alt="paypal" src="https://www.traycorp.com.br/wp-content/uploads/2020/03/paypal.jpg" />
            <input 
              id="paypal"
              type="radio"
              name="pagamento"
              value="paypal"
              onChange={ handleChange }
              checked={ pagamento === 'paypal' }
            />
          </label>
        </div>
        <Link to="/mood-store2.0/">
          <button
            onClick={ apagarItens }
            className="checkout-products checkout-page-bot"
          >
            Comprar
          </button>
        </Link>
      </form>
    );
  }
}

export default Form;
