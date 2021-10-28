import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../services/api';
import { changeCategory } from '../actions';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    }
  }

  componentDidMount() {
    this.categoriesToState();
  }

  categoriesToState = async () => {
    const result = await getCategories();
    this.setState({ categories: result });
  }

  getCategoryId = async ({ target }) => {
    const { changeCategory } = this.props;
    const { id } = target.closest('button');
    changeCategory(id);
  }

  mapCategories = () => {
    const { categories } = this.state;
    const elemnts = categories.map(({ name, id }) => (
      <button
        type="button"
        data-testid="category"
        key={ name }
        id={ id }
        onClick={ this.getCategoryId }
      >
        { name }
      </button>
    ));
    return elemnts;
  }

  render() {
    const { categories } = this.state
    return (
      <div>
        { categories.length && this.mapCategories() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (id) => dispatch(changeCategory(id)),
});

export default connect(null, mapDispatchToProps)(Categories)
