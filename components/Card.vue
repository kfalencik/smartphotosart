<template>
  <div class="product column is-full-mobile is-half-tablet is-half-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
    <div class="card">
      <router-link :to="'/shop/' + product.slug">
        <div class="product__discount-badge" v-if="product.discount">
          -{{ product.discount }}%
        </div>
        <div class="product__image">
          <img :src="product.image2" :alt="product.title" loading="lazy" />
        </div>
        <div class="product__title">
          <h5>{{ product.title }}</h5>
        </div>
        <div class="product__price">
          <template v-if="product.discount">
            <span>From &nbsp;</span>
            <span class="discount">{{ price(product.price) }}</span>
            <span class="price"><strong>${{ discount(product.price, product.discount) }}</strong></span>
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
    },
    materials () {
      return this.$store.state.pricing
    }
  },
  methods: {
    discount: function(price, discount) {
      price = parseFloat(price)
      price = (price - ((price / 100) * discount)) + this.materials[0].finishes[0].styles[0].sizes[0]
      return price;
    },
    price: function(price) {
      price = parseFloat(price) + this.materials[0].finishes[0].styles[0].sizes[0]
      return '$' + (Math.floor(price * 100) / 100).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    box-shadow: none;
    padding-bottom: 35px;
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
      transition: all .4s ease;
      height: 215px;
      text-align: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    a:hover {
      .product__image {
        transform: scale(1.1);
      }
    }

    &__title {
      padding: 10px 0 5px;
      margin-bottom: 5px;
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
