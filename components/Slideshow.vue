<template>
  <div class="slideshow">
    <div class="slideshow__slides">
      <div v-for="(slide, index) in services" :key="index" :class="{'slideshow__slide': true, 'slideshow__slide--prev': index + 1 === heroPreviousSlide, 'slideshow__slide--next': index + 1 === heroNextSlide, 'slideshow__slide--active': index + 1 === heroCurrentSlide}">
        <p v-html="slide"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      heroCurrentSlide: 1,
      heroNextSlide: 2,
      heroPreviousSlide: 5,
      heroTotalSlides: 5,
      services: [
        '<strong>Free shipping.</strong> We provide free shipping in the whole of USA.',
        '<strong>Safe payments.</strong> Secure payment system with PayPal.',
        '<strong>Discounts.</strong> Opportunities to save money everywhere.',
        '<strong>Custom orders.</strong> Order bespoke sized products.',
        '<strong>Support 24/7.</strong> Get our help anytime.'
      ],
			heroInterval: null,
      heroSlideDirection: 'slide-right',
      changingSlide: false,
      changingSlideInterval: null
    }
  },

  mounted() {
    this.initHeroSlider();
  },

  methods: {
    initHeroSlider: function() {
      let app = this;
      app.changingSlide = false;

      app.heroInterval = setInterval(function() {
        app.changeSlide(app.heroCurrentSlide + 1);
      }, 8000);
    },
    changeSlide: function(slide) {
      const app = this;

      clearInterval(app.heroInterval);

      if (!app.changingSlide) {
        if (slide < this.heroCurrentSlide) {
          this.heroSlideDirection = 'slide-left';
        } else {
          this.heroSlideDirection = 'slide-right';
        }

        this.heroPreviousSlide = slide - 1;
        this.heroNextSlide = slide + 1;



        if (slide > this.heroTotalSlides) {
          slide = 1;
          this.heroNextSlide = 2;
          this.heroPreviousSlide = this.heroTotalSlides;
        }

        if (slide === 0) {
          slide = this.heroTotalSlides;
          this.heroNextSlide = 1;
          this.heroPreviousSlide = this.heroTotalSlides - 1;
        }

        this.heroCurrentSlide = slide;

        if (slide === 1) {
          this.heroPreviousSlide = this.heroTotalSlides;
        }

        app.changingSlide = true;

        // Block transitions for 1 second
        app.changingSlideInterval = setTimeout(function(){
          app.initHeroSlider();
        }, 1000);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .slideshow {
    height: 80px;
    width: 100%;
    padding: 0;
    position: relative;
    z-index: 10;
    overflow: hidden;
    margin: 0 auto;
    background-color: $primary;

    @media (min-width: $medium) {
      height: 40px;
    }

    &__slides {
      position: relative;
      height: 100%;
      width: 100%;
      height: 80px;

      @media (min-width: $medium) {
      height: 40px;
    }
    }

    &__slide {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      will-change: transform;
      text-align: center;
      transition: all 0.8s ease;
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        margin: 10px 0;
      }
      
      &--active {
        opacity: 1;
      }

    }
  }
</style>
