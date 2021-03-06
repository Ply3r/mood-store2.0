export const CATEGORY_SELECTED = 'CATEGORY_SELECTED'
export const PRODUCTS = 'PRODUCTS'
export const TOTAL_ITENS = 'TOTAL_ITENS'
export const SEARCH = 'SEARCH'
export const TOTAL_PRICE = 'TOTAL_PRICE'

export const changeCategory = (id) => ({
  type: CATEGORY_SELECTED,
  id
})

export const changeSearch = (search) => ({
  type: SEARCH,
  search
})

export const changeTotalPrice = (price) => ({
  type: TOTAL_PRICE,
  price,
}); 

export const changeTotalItens = (totalCart) => ({
  type: TOTAL_ITENS,
  totalCart,
})

export const changeProducts = (products) => ({
  type: PRODUCTS,
  products
})