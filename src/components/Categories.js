import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../services/api';
import { changeCategory, changeSearch } from '../actions';
import '../css/categories.css';

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
    const { changeCategory, changeSearch } = this.props;
    const { id } = target.closest('button');
    changeCategory(id);
    changeSearch('');
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
    const { show, onMouseLeave } = this.props;
    const { categories } = this.state
    return (
      <>
      { show && 
        <Link to="/">
          <div
            onMouseLeave={ onMouseLeave }
            className="categories-container"
          >
            { categories.length && this.mapCategories() }
          </div>
        </Link>
      }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (id) => dispatch(changeCategory(id)),
  changeSearch: (search) => dispatch(changeSearch(search))
});

export default connect(null, mapDispatchToProps)(Categories)
