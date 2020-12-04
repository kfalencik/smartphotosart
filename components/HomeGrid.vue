<template>
  <div class="home-grid">
    <div class="home-grid__item">
      <img :src="require('@/assets/images/home-main.jpg')" />
      <div class="home-grid__text">
        <h3 class="h2">Beautiful canvases</h3>
        <p>Discover our collection of beautiful fine art prints created just for you, offering a wide range of styles and subjects including our popular abstract and modern art prints.</p>
        <b-button to="/shop" tag="router-link" class="is-black"> 
          Explore Our Designs
        </b-button>
      </div>
    </div>
    <div class="home-grid__item">
      <img :src="require('@/assets/images/home-small-1.jpg')" />
      <div class="home-grid__text">
        <span class="pre-header">Just In</span>
        <h3 class="h2">New & Noteworthy</h3>
        <b-button @click="newProducts" class="is-black"> 
          Shop new arivals
        </b-button>
      </div>
    </div>
    <div class="home-grid__item">
      <img :src="require('@/assets/images/home-small-2.jpg')" />
      <div class="home-grid__text">
        <span class="pre-header">Go wide</span>
        <h3 class="h2">Panoramas</h3>
        <b-button @click="panoramaProducts" class="is-black"> 
          Shop our panoramas
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeGrid',

  methods: {
    newProducts() {
      this.$store.commit('sortProducts', 'date-az');
      this.$router.push('/shop')
    },
    panoramaProducts() {
      this.$store.commit('orientationProducts', 'panorama');
      this.$store.dispatch('filterProducts');
      this.$router.push('/shop')
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-grid {
    display: none;
    @media (min-width: $medium) {
      margin: 20px;
      display: block;
    }

    @media (min-width: $medium) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-gap: 20px;
    }
    
    &__item {
      position: relative;
      height: 300px;
      margin-bottom: 3px;

      @media (max-width: $medium) {
        color: $black !important;
      }


      @media (min-width: $medium) {
        margin: 0;
        height: 500px;
      }

      h3 {
        margin: 5px 0 15px;
      }

      .pre-header {
        font-size: 1em;
        text-transform: uppercase;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__item:nth-child(1) {
      grid-area: 1 / 1 / 2 / 3; 
    }

    &__item:nth-child(2) { 
      grid-area: 2 / 1 / 3 / 2;
    }
    &__item:nth-child(3) {
      grid-area: 2 / 2 / 3 / 3;

      img {
        object-position: left;
      }
    }

    &__text {
      position: absolute;
      bottom: 0;
      padding-bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      right: 0;
      max-width: 500px;
      text-align: center;
      width: 100%;
      padding: 20px;
      background: rgba(255,255,255,0.5);
      border: 1px solid $black;

      @media (min-width: $medium) {
        bottom: 20px;
      }
    }
  }
</style>