import { CATEGORY_SELECTED, PRODUCTS, SEARCH, TOTAL_ITENS, TOTAL_PRICE } from "../actions"

const INITIAL_STATE = {
  catSelected: 'MLB1144',
  products: [],
  search: '',
  totalCart: 0,
  totalPrice: 0,
}

const moodReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case CATEGORY_SELECTED:
    return { ...state, catSelected: actions.id }
  case PRODUCTS:
    return { ...state, products: actions.products }
  case TOTAL_ITENS:
    return { ...state, totalCart: actions.totalCart }
  case SEARCH:
    return { ...state, search: actions.search }
  case TOTAL_PRICE:
    return { ...state, totalPrice: actions.price }
  default:
    return state
  }
}

export default moodReducer;
