import store from './store/index';
//app.js
App({
  onLaunch () {
    store.initStore();
  },
  globalData: {}
})