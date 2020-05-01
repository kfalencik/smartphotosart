<template>
  <div v-if="loaded">
    <div v-if="cart.length > 0">
      <table class="cart">
        <tbody>
          <tr class="cart__item--head">
            <td></td><td>Product</td><td>Description</td><td>Quantity</td><td>Price</td><td></td></tr>
          </tr>

          <CartItem class="cart__item" v-for="(item, index) in cart" :key="'item-' + index" :index="index" :productid="item.product" :quantity="item.quantity" :extras="item.extras" />

          <tr class="cart__item--bold" v-if="discount !== null">
            <td></td>
            <td>Discount</td>
            <td><strong>Description:</strong> {{ discounts[discount].title }}</td>
            <td></td>
            <td class="cart-item__price">
              <strong>-{{ discounts[discount].discount }}%</strong>
            </td>
            <td></td>
          </tr>

          <tr class="cart__item--bold">
            <td></td>
            <td></td>
            <td></td>
            <td>Subtotal</td>
            <td>{{ price(total) }}</td>
            <td></td>
          </tr>
          <tr class="cart__item--bold">
            <td></td>
            <td></td>
            <td></td>
            <td>Tax</td>
            <td>{{ price(tax) }}</td>
            <td></td>
          </tr>
          <tr class="cart__item--bold">
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Total</strong></td>
            <td class="cart-item__price">
              <strong>{{ price(total + tax) }}</strong>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div class="columns">
        <div class="column is-full has-text-right">
          <img src="/payment-methods.png" width="200" alt="" role="presentation" />
        </div>
        <div class="column is-half pay">
          <b-field>
            <b-input name="discount" icon="ticket" placeholder="Coupon code" v-model="coupon"></b-input>
            <p class="control"><button class="button" @click="checkCode">Apply</button></p>
          </b-field>
        </div>
        <div class="column is-half pay">
          <button class="button is-success" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>

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
    loaded() {
      return this.$store.state.localStorage.status
    },
    cart() {
      return this.$store.state.localStorage.cart
    },
    discount() {
      return this.$store.state.localStorage.discount;
    },
    discounts() {
      return this.$store.state.discounts;
    },
    prices() {
      return this.$store.state.prices;
    },
    total() {
      let price = 0;

      this.cart.forEach(item => {
        let product = this.product(item.product);
        let productPrice = product.price;
        let discount = (productPrice / 100) * product.discount;
        productPrice = productPrice - discount;
        productPrice = productPrice + this.prices[item.extras[0]].price;

        if (this.prices[item.extras[0]].finish) {
          productPrice = productPrice + this.prices[item.extras[0]].finish[item.extras[1]].price;
        }

        if (this.prices[item.extras[0]].finish[item.extras[1]].styles) {
          productPrice = productPrice + this.prices[item.extras[0]].finish[item.extras[1]].styles[item.extras[2]].price;
        }

        if (this.prices[item.extras[0]].finish[item.extras[1]].backing) {
          productPrice = productPrice + this.prices[item.extras[0]].finish[item.extras[1]].backing[item.extras[6]].price;
        }

        if (this.prices[item.extras[0]].finish[item.extras[1]].size) {
          productPrice = productPrice + this.prices[item.extras[0]].finish[item.extras[1]].size[item.extras[3]].price;
        }

        if (this.prices[item.extras[0]].frame) {
          productPrice = productPrice + this.prices[item.extras[0]].frame[item.extras[4]].price;
        }

        if (this.prices[item.extras[0]].glass) {
          productPrice = productPrice + this.prices[item.extras[0]].glass[item.extras[5]].price;
        }

        price = price + (productPrice * item.quantity);
      });

      if (this.discount) {
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
        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();

        date = `${yyyy}/${mm}/${dd}`;

        if (date > findCode[0].expiry && findCode[0].expiry !== '') {
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
    extrasFromatter: function(extras) {
      return `
        Material: ${this.prices[extras[0]].title},
        Type: ${this.prices[extras[0]].finish ? this.prices[extras[0]].finish[extras[1]].title: this.prices[0].finish[extras[1]].title},
      `;
    },
    checkout: function() {
      this.$router.push({ path: '/shop/checkout' });
    }
  },
  components: {
    CartItem
  }
}
</script>

<style lang="scss" scoped>
  .cart {
    width: 100%;

    &__item {
      background: lighten($lightgrey, 40%);

      &--head {
        background: $black;
        color: $white;

        @media (max-width: $medium) {
          display: none !important;
        }
        
        td {
          padding: 10px;
        }
      }

      &--bold {
        border-bottom: 1px solid $black;
        border-top: 1px solid $black;

        td {
          padding: 10px;
        }
      }

      &:nth-child(odd) {
        background: $white;
      }
    }

    @media (max-width: $medium) {
      tbody, tr, td {
        display: block;
      }
    }
  }

  .pay {
    margin-top: 35px;
    text-align: right;
  }
</style>
