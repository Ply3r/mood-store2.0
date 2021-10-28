import React, { Component } from 'react';
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
      handleChange: getInput.bind(this),
    };
  }

  makeInputs = () => {
    const { handleChange } = this.state;
    const keys = Object.keys(this.state);
    const elements = keys.map((key) => {
      if (key === 'handleChange') return;
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
    return (
      <form>
        { this.makeInputs() }
      </form>
    );
  }
}

export default Form;
