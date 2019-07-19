// pages/warehouse.js
import create from '../../utils/create';
import { apiUrl } from '../../utils/config';
import { request } from '../../utils/wxp';
import store from '../../store/index';

create(store, {
  data: {
    language: null,
    strings: null,
    orders: []
  },
  async getOrders() {
    const { data } = await request({
      url: `${apiUrl}/order`
    })
    return data
  },
  async onLoad(options) {
    await new Promise(resolve => setTimeout(resolve, 10))
    store.showLoading()
    try {
      const orders = await this.getOrders();
      console.log(orders);
      this.setData({
        orders,
      })
    } catch (error) {
      console.error('There was an error loading orders', error)
    } finally {
      wx.hideLoading()
    }
  },
  async sendNotification({ detail }) {
    const { formId, target: { dataset: { order }} } = detail;
    // send open_id, form_id and order id
    try {
      const { data } = await request({
        url: `${apiUrl}/wechat/send-message`,
        method: 'post',
        data: {
          open_id: order.receipt.open_id,
          form_id: formId,
          order_id: order.id
        }
      });
      console.log(data);
    } catch(e) {
      console.log(e);
    }
  }
})