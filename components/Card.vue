<template>
  <div class="product column is-full-mobile is-half-tablet is-half-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
    <div class="card">
      <router-link :to="'/shop/' + product.slug">
        <div class="product__discount-badge" v-if="product.discount">
          -{{ product.discount }}%
        </div>
        <div class="product__image">
          <img :src="require('@/assets/products/' + product.image)" :alt="product.title" loading="lazy" />
        </div>
        <div class="product__title">
          <h5>{{ product.title }}</h5>
        </div>
        <div class="product__price">
          <template v-if="product.discount">
            <span>From &nbsp;</span>
            <span class="discount">{{ price(product.price) }}</span>
            <span class="price"><strong>{{ price(discount(product.price, product.discount)) }}</strong></span>
          </template>
          <template v-else>
            <span>From &nbsp;</span>
            <span class="price"><strong>{{ price(product.price) }}</strong></span>
          </template>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'id'
  ],
  computed: {
    product() {
      const product = this.$store.state.products.filter(product => product.id === this.id);
      return product[0];
    }
  },
  methods: {
    discount: function(price, discount) {
      return price - ((price / 100) * discount);
    },
    price: function(price) {
      return '$' + (Math.floor(price * 100) / 100).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    box-shadow: none;
  }

  .product {
    &__discount-badge {
      background: $tertiary;
      width: 90px;
      height: 50px;
      text-align: center;
      line-height: 28px;
      position: absolute;
      font-size: 1.6em;
      padding: 10px;
      color: $white;
      z-index: 10;
    }

    &__image {
      overflow: hidden;

      img {
        transition: all .4s ease;
        display: block;
      }
    }

    a:hover {
      img {
        transform: scale(1.1);
      }
    }

    &__title {
      padding: 10px 0;
      border-bottom: 1px solid $primary;

      h5 {
        color: $black;
      }
    }

    &__price {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      
      .price {
        color: $black;
      }

      .discount {
        color: $lightgrey;
        font-size: 0.8em;
        text-decoration: line-through;
        margin-right: 10px;
      }
    }
  }

</style>
