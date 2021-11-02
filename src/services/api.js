export const getCategories = async () => (
  fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((res) => res.json())
);

export const getProductsById = async (ids) => {
  const strIds = ids.join(',');
  return fetch(`https://api.mercadolibre.com/items?ids=${strIds}`)
    .then((res) => res.json());
};

export const getProductsFromCategory = async (categoryId) => (
  fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`)
    .then((res) => res.json())
    .then(({ results }) => results )
)

export const getProductsFromQuery = async (query) => (
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
    .then((res) => res.json())
    .then(({ results }) => results )
);
