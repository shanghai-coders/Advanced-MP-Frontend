// store/index.js
import languageStrings from '../i18n/index'
import { getStoredOrPhoneLanguage, setStoredLanguage } from '../services/language'

export default {
  data: {
    strings: languageStrings,
    language: 'en',
    cartItems: [
      { id: 1, quantity: 3 }
    ]
  },
  initStore () {
    this.initLanguage()
  },
  async initLanguage () {
    const language = await getStoredOrPhoneLanguage()
    await this.setLanguage()
  },
  async setLanguage (language = 'en') {
    await this.update({ language })
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
  async updateQuantity (id, action) {
    const { cartItems } = this.data
    const existingIndex = cartItems.findIndex(i => i.id === id)
    const item = existingIndex !== -1 ? cartItems[existingIndex] : { id, quantity: 0 }
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
      const newCartItems = [...cartItems].filter(i => i.id !== id)
      await this.update({
        cartItems
      })
    }
  }
}