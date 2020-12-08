<template>
  <div class="home-grid">
    <div class="home-grid__item">
      <img :src="require('@/assets/images/home-main.jpg')" />
      <div class="home-grid__text">
        <h1 class="h2">Beautiful Art Prints</h1>
        <p>Discover our collection of beautiful fine art prints created just for you, offering a wide range of styles and subjects including our popular beach and modern art prints.</p>
        <b-button to="/shop" tag="router-link" class="is-black"> 
          Explore Our Designs
        </b-button>
      </div>
    </div>
    <div class="home-grid__item">
      <img :src="require('@/assets/images/home-small-1.jpg')" />
      <div class="home-grid__text">
        <span class="pre-header">Still warm</span>
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
    max-width: 1980px;
    margin: 0 auto;

    @media (min-width: $medium) {
      margin: 20px auto;
    }

    @media (min-width: $medium) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-gap: 20px;
    }
    
    &__item {
      position: relative;
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
        height: 150px;
        object-fit: cover;
        display: block;

        @media (min-width: $medium) {
          height: 100%;
        }
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
      text-align: center;
      padding: 20px;
      padding-bottom: 40px;
      background: $primary;

      @media (min-width: $medium) {
        position: absolute;
        bottom: 0;
        padding-bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        right: 15px;
        bottom: 20px;
        width: calc(100% - 30px);
        padding: 20px;
        background: rgba(255,255,255,0.75);
        border: 1px solid $black;
      }
    }
  }
</style>