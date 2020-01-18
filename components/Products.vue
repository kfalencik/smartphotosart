<template>
  <div class="products">
    <div class="is-variable is-mobile columns is-2" v-if="products.length > 0">
      <Card v-for="product in products" :key="product.id" :id="product.id" />
    </div>

    <div class="no-results" v-else>
      <p>Sorry, we have not found any results matching your criteria. Please change filter options and try again.</p>
    </div>
  </div>
</template>

<script>
import Card from './Card';

export default {
  props: ['products'],
  components: {
    Card
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
}
</script>

<style lang="scss" scoped>
  .products {
    position: relative;
    width: 100%;
  }

  .no-results {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
