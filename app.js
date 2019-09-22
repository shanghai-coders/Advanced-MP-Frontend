//app.js
import store from './store/index'

App({
  onLaunch () {
    setTimeout(() => {
      store.initStore()
    }, 10)
  },
  globalData: {
    test: 'testing'
  }
})