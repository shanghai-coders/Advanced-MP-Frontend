import create from '../../utils/create';
import store from '../../store/index';
import auth from '../../services/auth';
import wxp from '../../utils/wxp';
import { apiUrl } from '../../utils/config';

// pages/profile/profile.js

create(store, {
  data: {
    // From store
    loggedIn: null,
    userData: null,
    code: null,
    phoneNumber: ''
  },
  onLoad(options) {
    console.log(store.data)
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
  async login() {
    const { code } = await wxp.login();
    this.setData({
      code
    });
  },
  async getPhoneNumber({ detail }) {
    const { encryptedData, iv } = detail;

    try {
      const { code } = this.data;
      // const { code } = await wxp.login();
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
