// components/PaymentButton/PaymentButton.js
import create from '../../utils/create'
import store from '../../store/index'
import computedBehavior from 'miniprogram-computed'
import { request, requestPayment } from '../../utils/wxp';
import { apiUrl } from '../../utils/config';

create({
  behaviors: [computedBehavior],
  properties: {
    products: Array
  },
  data: {
    cartItems: []
  },
  computed: {
    totalQuantity() {
      const { cartItems } = this.data
      return cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
    },
    totalPrice() {
      const { cartItems } = this.data
      console.log(cartItems)
      return cartItems.reduce((acc, curr) => acc + ( curr.quantity * curr.price), 0)
    }
  },
  methods: {
    async pay() {
      // Create order and get params for requestPayment
      store.showLoading();
      try {
        const { userData, products, totalPrice, totalQuantity } = this.data;
        console.log(userData);
        if(userData.openId) {

          // const { data } = await request({
          //   url: `${apiUrl}/order/create`,
          //   method: 'post',
          //   data: {
          //     "created_at": new Date().getTime(),
          //     "open_id": userData.openId,
          //     "totalPrice": totalPrice,
          //     "totalQuantity": totalQuantity,
          //     "status": "open",
          //     products,
          //   }
          // });

          // const result = await requestPayment(data);
          // console.log({ result });
          // if(result.errMsg === 'requestPayment:ok') {
          //   // Redirect to thank you page
          // }
          
          // return;
        }
        this.update({
          userData: {},
          loggedIn: null,
        });
        wx.switchTab({
          url: '/pages/profile/profile',
        });
        
      } catch (e) {
        console.log(e);
      } finally {
        wx.hideLoading()
      }
      
    }
  }
})
