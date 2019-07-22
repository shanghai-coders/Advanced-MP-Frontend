// components/ItemQuantity/ItemQuantity.js
import computedBehavior from 'miniprogram-computed'
import store from '../../store/index'

Component({
  behaviors: [computedBehavior],
  properties: {
    productId: Number,
    productPrice: Number,
    cartItems: {
      type: Array,
      value: []
    },
    allowChangeQuantity: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  computed: {
    itemQuantity () {
      const { cartItems, productId } = this.data
      let quantity = 0
      const item = cartItems.find(items => items.id === productId)
      if (item) quantity = item.quantity
      return quantity
    }
  },
  methods: {
    updateQuantity ({ currentTarget: { dataset: { action } } }) {
      const { productId, productPrice } = this.data
      store.updateQuantity(productId, productPrice, action)
    }
  }
})
