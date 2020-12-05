<template>
  <div v-if="product">
    <div class="stars">
      <router-link v-for="index in starsAverage" :key="'star-' + index" :to="'/shop/reviews/' + product"><b-icon icon="star" /></router-link>
      <router-link v-for="index in 5 - starsAverage" :key="'star-empty-' + index" :to="'/shop/reviews/' + product"><b-icon icon="star-outline" /></router-link>

      <span class="reviews" v-if="link">
        <span v-if="productReviews.length">({{productReviews.length}}) <router-link :to="'/shop/reviews/' + product">Read or add a review</router-link></span>
        <span v-else>(0) <router-link :to="'/shop/reviews/' + product">Add a review</router-link></span>
      </span>
    </div>
  </div>

  <div class="stars" v-else>
    <b-icon v-for="index in parseInt(stars)" :key="'star-' + index" icon="star" />
    <b-icon v-for="index in 5 - parseInt(stars)" :key="'star-empty-' + index" icon="star-outline" />
  </div>
</template>

<script>
  export default {
    props: ['product', 'link', 'stars'],
    computed: {
      productReviews() {
        return this.$store.state.reviews.filter(review => review.id === this.product)
      },
      starsAverage() {
        let stars = 0;
        let reviewsTotal = this.productReviews.length;

        if (reviewsTotal > 0) {
          this.productReviews.forEach(review => {
            stars = stars + review.stars;
          });

          return Math.ceil(stars / reviewsTotal);
        } else {
          return 0;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .stars {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .icon {
      color: $tertiary;
    }

    .reviews {
      margin-left: 10px;
      font-size: 0.8em;
      color: $black;

      a {
        color: $black;
      }
    }
  }
</style>
