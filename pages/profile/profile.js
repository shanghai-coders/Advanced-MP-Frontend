import create from '../../utils/create';
import store from '../../store/index';
import auth from '../../services/auth';
import wxp from '../../utils/wxp';
import { apiUrl } from '../../utils/config';

// pages/profile/profile.js

create(store, {
  data: {
    // From store
    language: null,
    strings: null,
    loggedIn: null,
    userData: null,
    phoneNumber: '',
    readableLanguages: {
      en: "English",
      zh: "中文"
    }
  },
  onLoad(options) {
    console.log(store.data)
  },
  changeLanguage () {
    const { language } = this.data
    const availableLanguages = ['en', 'zh']
    const newLanguage = availableLanguages.filter(l => l !== language)[0]
    store.setLanguage(newLanguage)
  },
  async getUserInfo({ detail }) {
    const { userInfo, encryptedData, iv } = detail;
    if(userInfo) {
      try {
        const { code } = store.data;

        const { data } = await wxp.request({
          url: `${apiUrl}/wechat/login?code=${code}`, method: 'post', data: {
            encryptedData,
            iv
          }
        });

        await auth.setUserData(data);
        console.log(data);
        this.update({
          userData: data,
          loggedIn: true
        });
      } catch(e) {
        console.log(e);
      }
    }
  },
  async getPhoneNumber({ detail }) {
    const { encryptedData, iv } = detail;

    try {
      // const { code } = store.data;
      const { code } = await wxp.login();
      const { data } = await wxp.request({
        url: `${apiUrl}/wechat/login?code=${code}`, method: 'post', data: {
          encryptedData,
          iv
        }
      });
      this.setData({
        phoneNumber: data.phoneNumber
      });
      
    } catch(e) {
      console.log(e);
    }
  }
})
