import create from '../../utils/create';
import store from '../../store/index';
import auth from '../../services/auth';

// pages/profile/profile.js

create(store, {
  data: {
    // From store
    loggedIn: null,
    userData: null,
    language: null,
  },
  onLoad(options) {
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
