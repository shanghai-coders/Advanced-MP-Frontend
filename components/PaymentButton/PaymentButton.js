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
  },
  methods: {
    async pay() {
      // Create order and get params for requestPayment
      
    }
  }
})
