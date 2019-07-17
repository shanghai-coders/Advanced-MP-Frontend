// store/index.js
import auth from '../services/auth';

export default {
  data: {
    loggedIn: null,
    userData: {}
  },
  initStore() {
    this.getStoredUserData();
  },
  async getStoredUserData() {
    const userData = await auth.getUserData();
    if (userData) {
      this.update({
        userData,
        loggedIn: true
      });
      return
    }
  },
}