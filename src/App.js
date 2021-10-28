import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import store from './store';

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/cart" component={ Cart } />
            <Route
              path="/product/:id"
              render={ (props) => <Product { ...props } /> }
            />
            <Route path="/checkout" component={ Checkout } />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
