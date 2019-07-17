import create from '../../utils/create';
import store from '../../store/index';
import wxp from '../../utils/wxp';
import auth from '../../services/auth';
import { apiUrl } from '../../utils/config';


create(store, {
    data: {
      loggedIn: null,
      userData: null
    },

    onLoad(options) {
      console.log(this.data.loggedIn)
    },
  async getUserInfo({ detail }) {
    const { userInfo, encryptedData, iv } = detail;
    console.log(detail);
    if (userInfo) {
      try {
        const { code } = await wxp.login();

        const data = await wxp.request({
          url: `${apiUrl}/wechat/login?code=${code}`, method: 'post', data: {
            encryptedData,
            iv
          }
        });
        await auth.setUserData(userInfo);
        this.update({
          userData: userInfo,
          loggedIn: true
        });
      } catch (e) {
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

    } catch (e) {
      console.log(e);
    }
  }
})