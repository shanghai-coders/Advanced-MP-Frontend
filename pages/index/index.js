//index.js
import { apiUrl } from '../../utils/config'
import { request } from '../../utils/wxp'

Page({
  data: {
    products: []
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
