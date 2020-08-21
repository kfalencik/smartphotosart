<template>
  <div class="filters">
    <div class="filters__item">
      <h5>Categories</h5>
      <div class="filters__item-field" v-for="category in categories" :key="category.id">
        <b-checkbox v-model="filterCategories" :checked="categoryEnabled(category.slug)" :native-value="category.slug" expanded>{{category.title}}</b-checkbox>
      </div>
    </div>

    <b-field label="Sort by">
      <b-select placeholder="Filter by" v-model="sorter" @input="sortProducts" expanded>
        <option value="popularity-az">Most popular</option>
        <option value="popularity-za">Least popular</option>
        <option value="date-az">Newest products</option>
        <option value="date-za">Oldest products</option>
        <option value="price-za">Lowest price</option>
        <option value="price-az">Highest price</option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sorter: 'popularity-az'
    }
  },
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters {
    margin-right: 50px;
    padding-right: 20px;
    width: 200px;
    display: none;
    border-right: 1px solid lighten($lightgrey, 40%);

    &__item {
      width: 220px;
      margin-bottom: 35px;

      h5 {
        margin-bottom: 10px;
        text-decoration: underline;
      }
    }

    @media (min-width: $medium) {
      display: block;
    }
  }
</style>
