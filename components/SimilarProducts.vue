<template>
  <div class="section">
    <div class="container">
      <h2>
        <router-link to="/shop">Similar Designs</router-link>
      </h2>

      <Products :products="products" />
    </div>
  </div>

</template>

<script>
import Products from './Products';

export default {
  props: ['number'],
  computed: {
    products() {
      const productsArray = [...this.$store.state.products];
      let productsFound = [];

      const slug = this.$route.params.slug;
      const product = productsArray.filter(item => item.slug === slug)[0];
      const productCategories = product.categories.split(', ').sort((a, b) => (a > b) ? 1 : -1);
      
      for (let i = productsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [productsArray[i], productsArray[j]] = [productsArray[j], productsArray[i]];
      }

      while (productsFound.length < this.number) {
        productsArray.forEach(item => {
          if (item.slug !== slug) {
            item.similarity = 0
            if (item.categories.split(', ').sort((a, b) => (a < b) ? 1 : -1).includes(productCategories[0])) {
              item.similarity = item.similarity + 2
            }
            if (item.categories.split(', ').sort((a, b) => (a < b) ? 1 : -1).includes(productCategories[1])) {
              item.similarity = item.similarity + 1
            }
            if (item.categories.split(', ').sort((a, b) => (a < b) ? 1 : -1).includes(productCategories[2])) {
              item.similarity = item.similarity + 1
            }
            if (item.title.substring(0, 3) === product.title.substring(0, 3)) {
              item.similarity = item.similarity + 5
            }

            productsFound.push(item)
          }
        })
      }
      
      productsFound = productsFound.sort((a, b) => (a.similarity > b.similarity) ? -1 : ((a.similarity < b.similarity) ? 1 : 0));
      return productsFound.slice(0, this.number);
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
      text-align: center;

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
