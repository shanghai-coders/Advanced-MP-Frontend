import wxp from '../utils/wxp';
import { apiUrl } from '../utils/config';

export default {
  async getCode() {
    try {
      const { code } = await wxp.login();
      return code;
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