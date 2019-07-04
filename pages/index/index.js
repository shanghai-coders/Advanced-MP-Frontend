//index.js
import create from '../../utils/create'
import store from '../../store/index'
import { apiUrl } from '../../utils/config'
import { request } from '../../utils/wxp'

create(store, {
  data: {
    language: null,
    strings: null,
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
    await new Promise(resolve => setTimeout(resolve, 10))
    store.showLoading()
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
