// pages/warehouse.js
import create from "../../utils/create";
import { apiUrl } from "../../utils/config";
import { request } from "../../utils/wxp";
import store from "../../store/index";

create(store, {
  data: {
    language: null,
    strings: null,
    userData: {},
    orders: []
  },
  async getOrders() {
    const { data } = await request({
      url: `${apiUrl}/order`
    });
    return data;
  },
  async sendMessage() {
    try {
      const url = `${apiUrl}/wechat/send-message`;

      const { openId } = this.data.userData;

      console.log(openId);

      const { data } = await request({
        url,
        method: "post",
        data: {
          open_id: openId
        }
      });
    } catch (error) {
      console.error("There was an error loading orders", error);
    } finally {
      wx.hideLoading();
    }
  },
  async onLoad(options) {
    await new Promise(resolve => setTimeout(resolve, 10));
    store.showLoading();
    try {
      const orders = await this.getOrders();
      console.log(orders);
      this.setData({
        orders
      });
    } catch (error) {
      console.error("There was an error loading orders", error);
    } finally {
      wx.hideLoading();
    }
  }
});
