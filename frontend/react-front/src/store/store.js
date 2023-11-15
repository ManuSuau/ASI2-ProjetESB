// store.js
import { createStore } from 'redux';
import rootReducer from './reducer'; // You'll create this file

const store = createStore(rootReducer);

export default store;
