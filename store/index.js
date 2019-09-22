// store/index.js
import auth from '../services/auth'
export default {
  data: {
    loggedIn: null,
    userId: 1,
    userData: {},
    code: null,
    cartItems: []
  },
  initStore () {
    this.getStoredUserData();
    this.getCode();
  },
  async getStoredUserData() {
    const userData = await auth.getUserData();
    if(userData) {
      this.sendShareData();
      this.update({
        userData,
        loggedIn: true
      });
      return
    }
  },
  async sendShareData () {
    const { query } = wx.getLaunchOptionsSync()
    if (query.sharer_id) {
      const data = {
        sharer_id: query.sharer_id,
        opener_id: this.data.userId
      }
      console.log(data)
      wx.request({
        url: 'your-backend-analytics-url',
        data,
        complete: (res) => {
          console.log(res)
        }
      })
    }
  },
  async getCode() {
    try {
      const code = await auth.getCode();
      this.update({
        code
      });
    } catch(e) {
      console.log(e);
    }
  },
  async updateQuantity (id, price, action) {
    const { cartItems } = this.data
    const existingIndex = cartItems.findIndex(i => i.id === id)
    const item = existingIndex !== -1 ? cartItems[existingIndex] : { id, quantity: 0, price }
    if (action === 'inc') {
      item.quantity += 1
    } else if (item.quantity > 0) {
      item.quantity -= 1
    }
    if (item.quantity > 0) {
      const insertIndex = existingIndex !== -1 ? existingIndex : cartItems.length
      await this.update({
        [`cartItems[${insertIndex}]`]: item
      })
    } else {
      await this.update({
        cartItems: [...cartItems].filter(i => i.id !== id)
      })
    }
  }
}