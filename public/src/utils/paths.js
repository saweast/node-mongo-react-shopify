import config from './config';

// Webhook
export const webhooksPath = `${config.apiPath}/webhook/bulkcreate`;

// Shop
export const shopInfoPath = `${config.apiPath}/shop`;
export const configPath = `${config.apiPath}/config`;

// Product
export const getApiProductsPath = `${config.apiPath}/products`;
export const getApiProductPath = productId => `${config.apiPath}/products/${productId}`;

// Product Metafields
export const getApiProductMetafieldsPath = productId => `${config.apiPath}/products/${productId}/metafields`;
export const postApiProductMetafieldsPath = productId => `${config.apiPath}/products/${productId}/metafields`;
export const deleteApiProductMetafieldPath = (productId, metafieldId) => `${config.apiPath}/products/${productId}/metafields/${metafieldId}`;

// Themes
export const getApiThemes = `${config.apiPath}/themes`;
export const getApiMainTheme = `${config.apiPath}/themes/main`;

// Search Product
export const searchApiProductsPath = `${config.apiPath}/search/products`;

// Router paths
export const homePath = '/';
export const loginPath = '/login';
export const productsPath = '/products';
// export const productPath = '/products/:id';
