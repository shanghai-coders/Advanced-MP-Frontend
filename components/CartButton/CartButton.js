// components/CartButton/CartButton.js
import create from '../../utils/create'
import computedBehavior from 'miniprogram-computed'

create({
  behaviors: [computedBehavior],
  properties: {

  },
  data: {
    cartItems: []
  },
  computed: {
    cartTotalQuantity () {
      const { cartItems } = this.data
      return cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
    }
  },
  methods: {
    tapCartIcon () {
      wx.switchTab({
        url: '/pages/cart/cart',
      })
    }
  }
})
