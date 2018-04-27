// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import accounts from './accounts';
import loading from './loading';

const rootReducer = combineReducers({
  accounts,
  loading,
  router,
});

export default rootReducer;
