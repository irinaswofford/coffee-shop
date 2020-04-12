  
import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import coffeeShopReducer from './coffeeShopReducer';

  const rootReducer = combineReducers({
    coffeeShopReducer,
    modalReducer
  })

export default rootReducer;