<template>
  <div class="section section--page">
    <div class="container">
      <div class="page-header">
        <h2>Shop</h2>
        <p>Discover our collection of beautiful fine art prints created just for you, offering a wide range of styles and subjects including our popular abstract and modern art prints.</p>
      </div>
      <div class="filters">
        <b-button icon-left="filter" @click="toggleFilters">Filters</b-button>
        <b-field>
          <b-select placeholder="Sort by" v-model="sorter" @input="sortProducts($event)" expanded>
            <option value="popularity-az">Bestselling</option>
            <option value="price-za">Price, low to high</option>
            <option value="price-az">Price, high to low</option>
            <option value="date-az">Date, new to old</option>
            <option value="date-za">Date, Old to new</option>
          </b-select>
        </b-field>
      </div>
      <div class="columns is-mobile">
        <Products class="column" :products="products" />
      </div>
    </div>
    <b-sidebar
      :fullheight="true"
      v-model="openFilters"
    >
      <div class="p-4">
        <Filters class="column is-narrow" />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import Products from '~/components/Products';
import Filters from '~/components/Filters';

export default {
  head () {
    return {
      title: 'Peter Falencik Photography - Shop',
    }
  },

  components: {
    Products,
    Filters
  },

  name: 'Shop',

  transition: 'page',

  data () {
    return {
      openFilters: false
    }
  },

  computed: {
    products() {
      return this.$store.state.filteredProducts;
    },

    sorter: {
      set (sorter) {
        this.$store.commit('sortProducts', sorter);
      },
      get () {
        return this.$store.state.sorter;
      }
    },
  },

  mounted() {
    if (this.$route.params.reset || this.$route.params.new) {
      this.$store.commit('setSearchKeyword', '');
      this.$store.commit('toggleFilterCategory', []);
      this.$store.commit('orientationProducts', '');
      this.$store.dispatch('filterProducts');
      if (this.$route.params.new) {
        this.$store.commit('sortProducts', 'date-az');
      } else {
        this.$store.commit('sortProducts', 'popularity-az');
      }
    } else {
      this.$store.commit('sortProducts');
    }
  },

  methods: {
    toggleFilters () {
      this.openFilters = true
    },

    sortProducts: function(event) {
      this.$store.commit('sortProducts', this.sorter);
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    min-height: 60vh;

    .columns {
      @media (min-width: $large) {
        width: 100%;
      }
    }

    .filters {
      display: flex;
      justify-content: space-between;
      margin: 15px 0 35px;
    }
  }
</style>
