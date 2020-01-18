<template>
  <div class="testimonials">
    <div class="container">
      <h3>Your reviews!</h3>
      <div class="testimonials__slides">
        <div v-for="(slide, index) in reviews" :key="index" :class="{'testimonials__slide': true, 'testimonials__slide--prev': index + 1 === testimonialsPreviousSlide, 'testimonials__slide--next': index + 1 === testimonialsNextSlide, 'testimonials__slide--active': index + 1 === testimonialsCurrentSlide}">
            <div class="testimonials__slide-content">
              <Stars :stars="slide.stars" />
              <p>"{{slide.review}}"</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stars from '~/components/Stars';

export default {
  data() {
    return {
      testimonialsCurrentSlide: 1,
      testimonialsNextSlide: 2,
      testimonialsPreviousSlide: this.testimonialsTotalSlides,
			testimonialsInterval: null,
    }
  },
  components: {
    Stars,
  },
  computed: {
    reviews() {
      let reviews = this.$store.state.reviews;
      reviews = reviews.filter(review => review.stars > 3);
      return reviews;
    },
    testimonialsTotalSlides() {
      return this.reviews.length
    }
  },
  mounted() {
    let app = this;
    this.initTestimonialsSlider();
  },
  methods: {
    initTestimonialsSlider: function() {
      let app = this;
      app.changingSlide = false;

      app.testimonialsInterval = setInterval(function() {
        app.changeSlide(app.testimonialsCurrentSlide + 1);
      }, 4000);
    },
    changeSlide: function(slide) {
      const app = this;

      this.testimonialsPreviousSlide = slide - 1;
      this.testimonialsNextSlide = slide + 1;

      if (slide > this.testimonialsTotalSlides) {
        slide = 1;
        this.testimonialsNextSlide = 2;
        this.testimonialsPreviousSlide = this.testimonialsTotalSlides;
      }

      if (slide === 0) {
        slide = this.testimonialsTotalSlides;
        this.testimonialsNextSlide = 1;
        this.testimonialsPreviousSlide = this.testimonialsTotalSlides - 1;
      }

      this.testimonialsCurrentSlide = slide;

      if (slide === 1) {
        this.testimonialsPreviousSlide = this.testimonialsTotalSlides;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .testimonials {
    width: 100%;
    padding: 0;
    overflow: hidden;
    position: relative;
    z-index: 10;
    background: $secondary;
    color: white;
    margin-top: 50px;
    margin-bottom: -50px;

    h3 {
      margin-top: 20px;
      text-align: center;
      margin-bottom: 0;
    }

    &__slides {
      position: relative;
      height: 80px;
      width: 100%;
    }

    &__slide {
      position: absolute;
      width: 100%;
      height: 100%;
      will-change: transform;
      transform: translate(100%);
      transition: all 1s ease;
      opacity: 0;

      &--prev {
        transform: translate(-100%);
        opacity: 0;
      }

      &--active {
        transform: translate(0);
        z-index: 10;
        opacity: 1;
      }

      &--next {
        transform: translate(100%);
        opacity: 0;
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        font-style: italic;
      }
    }
  }
</style>
