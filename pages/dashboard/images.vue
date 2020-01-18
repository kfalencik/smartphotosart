<template>
  <div class="asset-gallery columns" v-if="assets.length">
    <div class="asset-gallery__item column is-one-fifth" v-for="(asset, index) in assets" :key="'image-' + index">
      <img :src="asset[1]" alt="image" />
      <p>{{ asset[0].name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    assets() {
      return this.$store.state.assets;
    }
  },
  layout: 'dashboard'
}
</script>

<style lang="scss" scoped>
  .asset-gallery {
    &__item {
      height: 300px;
      margin: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 2px solid $black;
      }
    }
  }
</style>
