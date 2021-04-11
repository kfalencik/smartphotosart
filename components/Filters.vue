<template>
  <div class="filters">
    <div class="filters__item">
      <h2>Filters</h2>
      <b-field grouped label="Categories">
      </b-field>
      <div class="filters__item-field" v-for="category in categories" :key="category.id">
        <b-field>
          <b-checkbox v-model="filterCategories" :checked="categoryEnabled(category.slug)" :native-value="category.slug" expanded>{{category.title}}</b-checkbox>
        </b-field>
      </div>
    </div>

    <b-field class="mt-5" label="Orientation type">
      <b-select placeholder="Orientation type" v-model="orientation" @input="orientationProducts($event)" expanded>
        <option value="">All</option>
        <option value="landscape">Landscape</option>
        <option value="portrait">Portrait</option>
        <option value="panorama">Panorama</option>
      </b-select>
    </b-field>

    <b-field class="mt-5" label="Limited Edition">
      <b-checkbox v-model="limitedEdition" expanded>Limited edition</b-checkbox>
    </b-field>

    <div class="filters__reset">
      <b-button class="is-full is-black" @click="resetFilters">Reset</b-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    filteredProducts() {
      return this.$store.state.filteredProducts;
    },
    filterCategories: {
      set (category) {
        this.$store.commit('toggleFilterCategory', category);
        this.filterProducts();
      },
      get () {
        return this.$store.state.filterCategories;
      }
    },
    limitedEdition: {
      set () {
        this.$store.commit('toggleLimitedEdition');
        this.$store.dispatch('filterProducts');
        this.$store.commit('sortProducts');
      },
      get () {
        return this.$store.state.limitedEdition;
      }
    },
    orientation: {
      set (orientation) {
        this.$store.commit('orientationProducts', orientation);
      },
      get () {
        return this.$store.state.orientation;
      }
    }
  },
  methods: {
    categoryEnabled: function(category) {
      if (this.filterCategories.indexOf(category) !== -1) {
        return true;
      }
    },
    filterProducts: function() {
      this.$store.dispatch('filterProducts');
      this.$store.commit('sortProducts', this.sorter);
    },
    sortProducts: function(event) {
      this.$store.commit('sortProducts', this.sorter);
    },
    orientationProducts: function(event) {
      this.$store.dispatch('filterProducts');
      this.$store.commit('sortProducts', this.sorter);
    },
    resetFilters: function() {
      this.$store.commit('setSearchKeyword', '');
      this.$store.commit('toggleFilterCategory', []);
      this.$store.commit('toggleLimitedEdition', false);
      this.$store.commit('toggleFilterCategory', []);
      this.$store.commit('sortProducts', 'popularity-az');
      this.filterProducts();
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters {
    h3 {
      margin-bottom: 50px;
    }

    &__item-field {
      display: block;
    }

    &__reset {
      margin-top: 35px;

      button {
        width: 100%;
      }
    }

    @media (min-width: $medium) {
      display: block;
    }
  }
</style>
