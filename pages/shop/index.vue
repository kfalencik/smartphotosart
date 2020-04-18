<template>
  <div class="section">
    <div class="container">
      <div class="columns is-mobile">
        <Filters class="column is-narrow" />
        <Products class="column" :products="products" />
      </div>
    </div>
  </div>
</template>

<script>
import Products from '~/components/Products';
import Filters from '~/components/Filters';

export default {
  head () {
    return {
      title: 'Smart Photos Art - Shop',
    }
  },
  name: 'Shop',
  transition: 'page',
  computed: {
    products() {
      return this.$store.state.filteredProducts;
    }
  },
  mounted() {
    this.$store.commit('sortProducts');
  },
  components: {
    Products,
    Filters
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: row;
    min-height: 60vh;

    .columns {
      @media (min-width: $large) {
        width: 100%;
      }
    }
  }
</style>
