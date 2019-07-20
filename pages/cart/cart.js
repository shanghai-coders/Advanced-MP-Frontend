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
    return data
  },
  async onShow () {
    store.showLoading()
    try {
      const products = await this.getProducts();
      console.log(products);
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