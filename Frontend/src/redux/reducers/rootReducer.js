import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import loggedReducer from './loggedReducer';
import cartPreviewReducer from './cartPreviewReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  loggedReducer,
  itemReducer,
  cartPreviewReducer,
  modalReducer,
});

export default rootReducer;