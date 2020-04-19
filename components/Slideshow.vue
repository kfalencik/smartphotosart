<template>
  <div class="slideshow">
    <button @click="changeSlide(heroCurrentSlide - 1)" class="slideshow__nav-item" title="Previous">
      <b-icon icon="arrow-left" custom-size="mdi-24px"></b-icon>
    </button>
    <button @click="changeSlide(heroCurrentSlide + 1)" class="slideshow__nav-item" title="Next">
      <b-icon icon="arrow-right" custom-size="mdi-24px"></b-icon>
    </button>

    <div class="slideshow__slides">
      <div v-for="(slide, index) in slides" :key="index" :class="{'slideshow__slide': true, 'slideshow__slide--prev': index + 1 === heroPreviousSlide, 'slideshow__slide--next': index + 1 === heroNextSlide, 'slideshow__slide--active': index + 1 === heroCurrentSlide}">
          <div class="slideshow__slide-image">
            <img :src="require('@/assets/slideshow/' + slide)" :alt="'Slide ' + index" />
          </div>
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
      heroPreviousSlide: this.heroTotalSlides,
			heroInterval: null,
      heroSlideDirection: 'slide-right',
      changingSlide: false,
      changingSlideInterval: null
    }
  },
  computed: {
    slides() {
      return this.$store.state.slideshow
    },
    heroTotalSlides() {
      return this.slides.length
    }
  },
  mounted() {
    let app = this;
    this.initHeroSlider();

    // document.querySelector('.hero').addEventListener('swiped-right', function(){
    //   app.changeSlide(app.heroCurrentSlide - 1);
    // });

    // document.querySelector('.hero').addEventListener('swiped-left', function(){
    //   app.changeSlide(app.heroCurrentSlide + 1);
    // });
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
    height: 375px;
    width: 100%;
    padding: 0;
    overflow: hidden;
    position: relative;
    z-index: 10;

    @media (min-width: $large) {
      height: 585px;
    }

    @media (min-width: $xlarge) {
      height: 650px;
    }

    &__logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 5px solid #000;
      background: $white;
      padding: 10px 15px;
      z-index: 50;

      @media (min-width: $large) {
        padding: 50px 75px;
      }
    }

    &__slides {
      position: relative;
      height: 585px;
      width: 100%;
    }

    &__slide {
      position: absolute;
      width: 100%;
      height: 100%;
      will-change: transform;
      transform: translate(100%);
      transition: all 1s ease;

      &--prev {
        transform: translate(-100%);
        z-index: 5;
      }

      &--active {
        transform: translate(0);
        z-index: 10;
      }

      &--next {
        transform: translate(100%);
        z-index: 3;
      }
    }

    &__slide-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 86%;
      max-width: 1140px;
      opacity: 0;
      animation: fadeIn 1s 1 forwards;
      animation-delay: .5s;
    }

    &__slide-image {
      height: 100%;

      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0,0,0,0.3);
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &__nav-item {
      background: $white;
      color: $black;
      position: absolute;
      top: 50%;
      left: 20px;
      border: none;
      width: 40px;
      height: 40px;
      z-index: 30;
      transition: all .5s ease;
      cursor: pointer;
      opacity: 0.3;
      display: block;
      transform: translateY(-50%);

      &:nth-child(2) {
        left: auto;
        right: 20px;
      }

      &:hover {
        background: $black;
        color: $white;
      }
    }

    &:hover &__nav-item {
      opacity: 1;
    }
  }
</style>
