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
      const productsFound = [];

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
            if (item.categories.split(', ').sort((a, b) => (a < b) ? 1 : -1).includes(productCategories[0])) {
              productsFound.push(item)
            }
            else if (item.categories.split(', ').sort((a, b) => (a < b) ? 1 : -1).includes(productCategories[1])) {
              productsFound.push(item)
            }
            else if (item.categories.split(', ').sort((a, b) => (a < b) ? 1 : -1).includes(productCategories[2])) {
              productsFound.push(item)
            }
          }
        })
      }
      
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
