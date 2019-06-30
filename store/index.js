// store/index.js
import languageStrings from '../i18n/index'
import { getStoredOrPhoneLanguage, setStoredLanguage } from '../services/language'
import auth from '../services/auth'
export default {
  data: {
    loggedIn: null,
    userData: {},
    strings: languageStrings,
    language: 'en'
  },
  initStore () {
    this.initLanguage()
    this.getStoredUserData();
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
  async getStoredUserData() {
    const userData = await auth.getUserData();
    if(userData) {
      this.update({
        userData,
        loggedIn: true
      });
      return
    }
  }
}