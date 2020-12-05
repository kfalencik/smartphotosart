<template>
  <div class="products">
    <div class="is-variable is-mobile columns is-2" v-if="products.length > 0">
      <Card v-for="product in products" :key="product.id" :id="product.id" />
    </div>

    <div class="no-results" v-else>
      <p>Sorry, we have not found any results matching your criteria. Please change or <a @click.prevent.stop="resetFilters">reset</a> filter options and try again.</p>
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
  },

  methods: {
    resetFilters: function() {
      this.$store.commit('setSearchKeyword', '');
      this.$store.commit('toggleFilterCategory', []);
      this.$store.commit('orientationProducts', '');
      this.$store.commit('sortProducts', 'popularity-az');
      this.$store.dispatch('filterProducts');
      this.$store.commit('sortProducts', this.sorter);
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
    padding: 5rem 0;
    font-size: 0.85em;
    color: $lightgrey;

    a {
      text-decoration: underline;
    }
  }
</style>
