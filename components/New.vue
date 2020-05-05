<template>
  <div class="section">
    <div class="container">
      <h2>Newest designs</h2>
      <Products :products="products" />
      <router-link to="/shop">See all products</router-link>
    </div>
  </div>

</template>

<script>
import Products from './Products';

export default {
  props: ['number'],
  computed: {
    products() {
      let productsArray = [...this.$store.state.products];
      let products = productsArray.sort((a, b) => (a.date < b.date) ? 1 : -1);
      products = products.slice(0, this.number);
      return products;
    }
  },
  components: {
    Products
  }
}
</script>

<style lang="scss" scoped>
  .container {
    h2 {
      margin-top: 0;
    }

    a {
      float: right;
      margin-top: 25px;
      text-decoration: underline;
    }
  }
</style>
