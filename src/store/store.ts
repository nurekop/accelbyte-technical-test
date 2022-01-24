import { createStore, applyMiddleware } from 'redux';
import reducer from './recuders';
import thunk from 'redux-thunk';

export const store = createStore(
  reducer,
  {},
  applyMiddleware(thunk)
)