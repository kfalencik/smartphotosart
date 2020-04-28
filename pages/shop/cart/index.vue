<template>
  <div class="section">
    <div class="container">
      <div>
        <router-link to="/shop">Go back to the shop</router-link>
      </div>
      <h2>Cart</h2>
      <div v-if="loaded">
        <Cart />
      </div>
      <p v-else>There are no items in your cart. Please add some items from <router-link to="/shop">our shop</router-link> first.</p>
    </div>
  </div>
</template>

<script>
import Cart from '~/components/Cart';

export default {
  head () {
    return {
      title: 'Smart Photos Art - Cart',
    }
  },
  name: 'Checkout',
  transition: 'page',
  components: {
    Cart,
  },
  computed: {
    loaded() {
      return this.$store.state.localStorage.status
    },
    cart() {
      return this.$store.state.localStorage.cart;
    },
    prices() {
      return this.$store.state.prices;
    },
    discounts() {
      return this.$store.state.discounts;
    },
    discount() {
      return this.$store.state.localStorage.discount;
    },
    total() {
      let price = 0;

      this.cart.forEach(item => {
        let product = this.product(item.product);
        let productPrice = this.productTotal(product);
        productPrice = this.productWithExtras(productPrice, item.extras[0], item.extras[1], item.extras[2], item.extras[3], item.extras[4], item.extras[5], item.extras[6]);
        price = price + (productPrice * item.quantity);
      });

      if (this.discount) {
        price = price - ((price / 100) * this.discounts[this.discount].discount);
      }

      return price;
    }
  },
  methods: {
    price: function(price) {
      return '$' + (Math.floor(price * 100) / 100).toFixed(2)
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
    productWithExtras(total, material, finish, style, size, frame, glass, backing) {
      let price = total;
      price = price + this.prices[material].price;

      if (this.prices[material].finish[finish].size) {
        price = price + this.prices[material].finish[finish].size[size].price;
      }

      if (this.prices[material].finish) {
        price = price + this.prices[material].finish[finish].price;
      }

      if (this.prices[material].finish[finish].styles) {
        price = price + this.prices[material].finish[finish].styles[style].price;
      }

      if (this.prices[material].finish[finish].backing) {
        price = price + this.prices[material].finish[finish].backing[backing].price;
      }

      if (this.prices[material].glass) {
        price = price + this.prices[material].glass[glass].price;
      }

      if (this.prices[material].frame) {
        price = price + this.prices[material].frame[frame].price;
      }

      return price;
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    min-height: 60vh;
    flex-direction: column;

    h2 {
      margin-top: 20px;
    }
  }
</style>
