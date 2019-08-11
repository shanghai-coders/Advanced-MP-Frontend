import create from '../../utils/create';
import store from '../../store/index';
import { apiUrl } from '../../utils/config';
import { request } from '../../utils/wxp';

// pages/cart/cart.js
create(store, {
  data: {
    language: null,
    strings: null,
    cartItems: [],
    products: []
  }
})