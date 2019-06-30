//index.js
import create from '../../utils/create'
import store from '../../store/index'
import { apiUrl } from '../../utils/config'
import { request } from '../../utils/wxp'

create(store, {
  data: {
    products: [],
    cartItems: []
  },
  async getProducts () {
    const { data } = await request({
      url: `${apiUrl}/product`
    })
    return data
  },
  async onLoad () {
    wx.showLoading({
      title: 'Loading...',
    })
    try {
      this.setData({
        products: await this.getProducts()
      })
    } catch (error) {
      console.error('There was an error loading products', error)
    } finally {
      wx.hideLoading()
    }
  }
})
