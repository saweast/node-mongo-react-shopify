var { ApolloClient } = require('apollo-boost');
var { createHttpLink } = require('apollo-link-http');
var { setContext } = require('apollo-link-context');
var { InMemoryCache } = require('apollo-cache-inmemory');
var fetch = require('node-fetch');

var { searchProductsQuery } = require('../../query/productQuery').searchProducts;
var request = require('request-promise');

const searchProducts = async (
  currentShopUrl,
  token,
  limit,
  after,
  before,
  title,
) => {
  let searchResponse;

  const query = searchProductsQuery(limit, title, after, before);

  const httpLink = createHttpLink({
    uri: `https://${currentShopUrl}/admin/api/2019-07/graphql.json`,
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    const result = {
      headers: {
        ...headers,
        'X-Shopify-Access-Token': token,
      },
    };
    return result;
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  await client.query({
    query,
  })
    .then((data) => {
      searchResponse = data;
    })
    .catch((error) => {
      throw error;
    });

  return searchResponse;
};


const includeHeaders = (body, response, resolveWithFullResponse) => (
  { headers: response.headers, data: body }
);

const searchProductsRest = async (shop, token, limit = 50, title = '') => {
  const url = `https://${shop}/admin/api/2019-10/products.json?limit=${limit}&title=${title}`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };
  const paginationLinks = {
    next: '',
    prev: '',
  };

  const options = {
    method: 'GET',
    uri: url,
    json: true,
    transform: includeHeaders,
    headers: shopRequestHeaders,
  };

  const productResult = await request.get(options)
    .catch((err) => {
      throw err;
    });

  if (productResult.headers.link) {
    productResult.headers.link.split(',').forEach((link) => {
      const object = {
        href: '',
        rel: '',
        token: '',
      };

      const tempParts = link.split('; ');
      const hrefPart = tempParts[0];
      const relPart = tempParts[1];
      const tokenPart = hrefPart.split('page_info=').pop();

      object.href = hrefPart.substr(1, hrefPart.indexOf('>'));
      object.rel = relPart.split('="')[1].substr(0, relPart.indexOf('"'));
      object.token = tokenPart.substr(0, tokenPart.indexOf('>'));

      paginationLinks[object.rel] = object;
    });
  }
  const result = {
    products: productResult.data.products,
    prev: paginationLinks.prev,
    next: paginationLinks.next,
  };

  return result;
};

module.exports = {
  searchProducts,
  searchProductsRest,
};
