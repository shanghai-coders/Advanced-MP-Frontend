import wxp from '../utils/wxp';
import { apiUrl } from '../utils/config';

export default {
  async login() {
    try {
      const { code } = await wxp.login();
      const data = await wxp.request({
        url: `${apiUrl}/wechat/login?code=${code}`
      });
      return data;
    } catch(e) {
      console.log(e);
    }
  },
  async setUserData(data) {
    await wxp.setStorage({ key: 'userData', data })
  },
  async getUserData() {
    try {
      const { data } = await wxp.getStorage({ key: 'userData' })
      return data
    } catch (error) {
      return null
    }
  }
}