import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {createStore} from 'redux';

import rootReducer from './reducers/rootReducer';

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
export let persistor = persistStore(store)
export default store;









// import {persistStore, persistReducer} from "redux-persist";
// import storage from "redux-persist/lib/storage";
 
// const state = {authenticated: false};
 
// const reducer = (state, action) => ({...state, ...action});
 
// const persistConfig = {
//     key: "root",
//     storage
// };
 
// const persistedReducer = persistReducer(persistConfig, reducer);
 
// const store = createStore(persistedReducer, state);
 
// const persistor = persistStore(store);