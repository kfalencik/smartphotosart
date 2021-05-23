<template>
  <div class="cart-wrapper" v-if="loaded">
    <template v-if="cart.length > 0">
      <div class="cart">
        <div class="cart__items">
          <CartItem class="cart__item" v-for="(item, index) in cart" :key="'item-' + index" :index="index" :productid="item.product" :quantity="item.quantity" :extras="item.extras" />
          <div class="cart-item" v-if="discount !== null">
            <strong>{{ discounts[discount].title }}</strong> - {{ discounts[discount].discount }}%
          </div>
        </div>
        <div class="cart__pay">
          <b-field class="cart__pay-discount">
            <b-input name="discount" icon="ticket" placeholder="Coupon code" v-model="coupon"></b-input>
            <div class="control"><button class="button" @click="checkCode">Apply</button></div>
          </b-field>
          <div class="my-2 cart__pay-total">
            Total <strong>{{ price(total) }}</strong>
          </div>
          <img class="my-2" src="/payment-methods.png" width="200" alt="" role="presentation" />
          <button class="button is-black" @click="checkout">Checkout</button>
        </div>
      </div>
    </template>
    <p v-else>There are no items in your cart. Please add some items from <router-link to="/shop">our shop</router-link> first.</p>
  </div>
</template>

<script>
import CartItem from '~/components/CartItem';

export default {
  data() {
    return {
      coupon: '',
      couponField: null,
      tax: 0
    }
  },
  computed: {
    loaded () {
      return this.$store.state.localStorage.status
    },

    cart () {
      return this.$store.state.localStorage.cart
    },

    discount () {
      return this.$store.state.localStorage.discount;
    },

    discounts () {
      return this.$store.state.discounts;
    },

    materials () {
      return this.$store.state.pricing
    },

    formats () {
      return this.$store.state.formats
    },

    total () {
      let price = 0;

      this.cart.forEach(item => {
        let product = this.product(item.product);
        let productPrice = product.price * this.formats[item.extras.format].sizes[item.extras.size].price;
        let discount = (productPrice / 100) * product.discount;
        productPrice = productPrice - discount;

        console.log(productPrice, product.customSizePrice)
        productPrice = productPrice + this.materials[item.extras.material].finishes[item.extras.finish][item.extras.format === 0 ? 'styles' : 'panoramaStyles'][item.extras.style].sizes[item.extras.size]

        if (product.customSize) {
          productPrice + parseFloat(product.customSizePrice)
        }
        if (item.extras.frame) {
          productPrice = productPrice + this.materials[item.extras.material].frames[item.extras.frame].sizes[item.extras.format][item.extras.size]
        }
        if (item.extras.frame && item.extras.glass) {
          productPrice = productPrice + this.materials[item.extras.material].glass[item.extras.glass].sizes[item.extras.format][item.extras.size]
        }

        price = price + (productPrice * item.quantity);
      });

      if (this.discount !== null) {
        price = price - ((price / 100) * this.discounts[this.discount].discount);
      }

      this.tax = parseFloat(((price / 100) * 7).toFixed(2));

      return price;
    }
  },

  methods: {
    checkCode: function() {
      let findCode = this.discounts.filter(discount => discount.code === this.coupon);

      if (findCode.length === 0) {
        this.couponField = false;
        this.$buefy.toast.open({message: 'Sorry, this coupon code doesn\'t exist.', type: 'is-warning'});
      } else {
        let date = new Date().getTime();

        if (date > new Date(findCode[0].expiry).getTime() && findCode[0].expiry !== '') {
          this.couponField = false;
          this.$buefy.toast.open({message: 'Sorry, this coupon has expired.', type: 'is-warning'});
        } else {
          this.couponField = true;
          this.$store.commit('localStorage/addDiscount', parseInt(findCode[0].id) - 1);
          this.$buefy.toast.open({message: 'Thanks! Your discount has been added to the order.', type: 'is-success'});
        }
      }
      this.coupon = '';
    },

    product(id) {
      const product = this.$store.state.products.filter(product => product.id === parseInt(id));
      return product[0];
    },

    productTotal(product) {
      let price = product.price;
      let discount = (price / 100) * product.discount;
      price = price - discount;

      return price;
    },

    price: function(price) {
      return '$' + (Math.floor(price * 100) / 100).toFixed(2)
    },

    priceFormatter: function(price) {
      return (Math.floor(price * 100) / 100).toFixed(2)
    },

    checkout: function() {
      this.$store.commit('openCart', false);
      this.$router.push({ path: '/shop/checkout' });
    }
  },
  components: {
    CartItem
  }
}
</script>

<style lang="scss" scoped>
  .cart-wrapper {
    flex: 1;
  }

  .cart {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    &__items {
      overflow-x: hidden;
      overflow-y: auto;
      width: 100%;
      max-height: 100%;
    }

    &__pay {
      padding-bottom: 15px;
      text-align: center;

      &-discount {
        border-top: 1px solid $grey;
        padding: 15px 0;
      }

      &-total {
        font-size: 1.2em;
      }

      button {
        width: 100%;
      }
    }
  }
</style>