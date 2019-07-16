import create from '../../utils/create';
import store from '../../store/index';


create(store, {
    data: {
      loggedIn: null
    },

    onLoad(options) {
      console.log(this.data.loggedIn)
    }
})