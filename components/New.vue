<template>
  <div class="section">
    <div class="container">
      <h2>
        <router-link to="/shop">Newest designs</router-link>
      </h2>

      <Products :products="products" />

      <div class="has-text-centered">
        <b-button to="/shop" tag="router-link" class="is-tertiary"> 
          <b-icon
            icon="cart"
            size="is-small">
          </b-icon>
          &nbsp; Explore Our Designs
        </b-button>
      </div>
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

      a {
        color: $black;
      }
    }

    .is-tertiary {
      background-color: $tertiary;
      color: $black;
    }

    .has-text-centered {
      margin-top: 2em;
    }
  }
</style>
