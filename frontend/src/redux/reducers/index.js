import { combineReducers } from 'redux';
import collectionReducer from './collectionReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';


export default combineReducers({
  collection: collectionReducer,
  product: productReducer,
  order: orderReducer,
  error: errorReducer,
  auth: authReducer
});