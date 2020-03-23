import { combineReducers } from 'redux';
import shop from './shop';
import config from './config';
import webhook from './webhook';
import product from './product';

export default combineReducers({
  shop,
  config,
  webhook,
  product
});

