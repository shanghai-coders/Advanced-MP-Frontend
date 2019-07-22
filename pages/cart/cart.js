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
  },
  async getProducts () {
    const { cartItems } = this.data;
    const ids = JSON.stringify(cartItems.map(ci => ci.id));
    const { data } = await request({
      url: `${apiUrl}/product/getMultiple/${ids}`
    })
    if(data) {
      const products = cartItems.map(ci => {
        let finalObj = {};
        data.forEach(d => {
          if(String(d.id) === String(ci.id)) {
            finalObj = {...d, ...ci};
          }
        });
        return finalObj;
      });
      return products;
    }
    return [];
  },
  async onShow () {
    store.showLoading()
    try {
      const products = await this.getProducts();
      this.setData({
        products
      });
    } catch (error) {
      console.error('There was an error loading products', error)
    } finally {
      wx.hideLoading()
    }
  }
})