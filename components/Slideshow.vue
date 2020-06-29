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
            <picture>
              <source :srcset="require(`@/assets/${slide.image}.jpg`)" media="(min-width: 2049px)">
              <source :srcset="require(`@/assets/${slide.image}_medium.jpg`)" media="(min-width: 1981px)">
              <source :srcset="require(`@/assets/${slide.image}_small.jpg`)" media="(min-width: 769px)">
              <img :src="require(`@/assets/${slide.image}_xs.jpg`)" />
            </picture>

            <template v-if="slide.title">
              <div class="slideshow__slide-text" :style="`color: ${slide.color}`"> 
                <h2>{{slide.title}}</h2>
              </div>
            </template>
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
    position: relative;
    z-index: 10;
    overflow: hidden;
    margin: 0 auto;

    @media (min-width: $large) {
      height: 585px;
    }

    @media (min-width: $large) {
      height: 615px;
    }

    @media (min-width: $xlarge) and (min-height: 1200px) {
      height: 700px;
    }

    @media (min-width: 3000) and (min-height: 1200px) {
      height: 900px;
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
      height: 100%;
      width: 100%;

      @media (min-width: $large) {
        height: 615px;
      }

      @media (min-width: $xlarge) and (min-height: 1200px) {
        height: 700px;
      }
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
        //background: rgba(0,0,0,0.35);
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center top;

        @media (max-width: $medium) {
          object-position: left center;
        }
      }
    }

    &__slide-text {
      color: $white;
      position: absolute;
      z-index: 20;
      transform: translateX(-50%);
      left: 50% !important;
      top: 15% !important;
      width: 1000px;
      text-align: center;
      color: $white !important;
      text-shadow: 0 0 5px rgba(0,0,0,0.4);
      width: 100%;

      h2 {
        text-decoration: none;
        margin: 0;
        font-weight: normal;
        font-size: 120px;
        line-height: 0.9;
        text-transform: uppercase;
        padding: 0 60px;
        font-family: $fontTitle;

        @media (max-width: $small) {
          font-size: 35px;
        }

        @media (max-width: $medium) {
          font-size: 45px;
          padding: 0 20px;
        }

        @media (max-width: $xlarge) {
          font-size: 80px;
        }
      }
    }

    &__nav-item {
      background: $black;
      color: $white;
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
      border: 1px solid $primary;

      @media (max-width: $small) {
        display: none;
      } 

      &:nth-child(2) {
        left: auto;
        right: 20px;
      }

      &:hover {
        background: $tertiary;
        color: $white;
      }
    }

    &:hover &__nav-item {
      opacity: 1;
    }
  }
</style>
