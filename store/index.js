// store/index.js
import languageStrings from '../i18n/index'
import { getStoredOrPhoneLanguage, setStoredLanguage } from '../services/language'
import auth from '../services/auth'
export default {
  data: {
    loggedIn: null,
    userId: 1,
    userData: {},
    code: null,
    strings: languageStrings,
    language: 'en',
    cartItems: []
  },
  initStore () {
    this.initLanguage()
    this.getStoredUserData();
    this.getCode();
  },
  async initLanguage () {
    const language = await getStoredOrPhoneLanguage()
    await this.setLanguage(language)
  },
  setLanguage (language = 'en') {
    this.update({ language })
    this.setNavbarTitle()
    this.setTabBar()
    setStoredLanguage(language)
  },
  setNavbarTitle () {
    const { strings, language } = this.data
    wx.setNavigationBarTitle({
      title: strings[language].navbarTitle
    })
  },
  setTabBar () {
    const { strings, language } = this.data
    const tabBarItems = ['home', 'cart', 'profile']
    tabBarItems.forEach((text, index) => {
      wx.setTabBarItem({
        index,
        text: strings[language].tabbar[text]
      })
    })
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
  },
  async showLoading () {
    const { language, strings } = this.data
    wx.showLoading({
      title: strings[language].loading
    })
  }
}