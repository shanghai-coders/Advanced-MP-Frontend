import create from '../../utils/create';
import store from '../../store/index';
import auth from '../../services/auth';

// pages/profile/profile.js

create(store, {
  data: {
    // From store
    language: null,
    strings: null,
    loggedIn: null,
    userData: null,
    readableLanguages: {
      en: "English",
      zh: "中文"
    }
  },
  onLoad(options) {
  },
  changeLanguage () {
    const { language } = this.data
    const availableLanguages = ['en', 'zh']
    const newLanguage = availableLanguages.filter(l => l !== language)[0]
    store.setLanguage(newLanguage)
  },
  async getUserInfo({ detail }) {
    const { userInfo } = detail;
    
    await auth.setUserData(userInfo);

    this.update({
      userData: userInfo,
      loggedIn: true
    });
  }
})
