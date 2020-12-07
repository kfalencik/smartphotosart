<template>
  <div class="cart-item">
    <div class="columns is-mobile" v-if="product">
      <div class="column is-one-third-mobile is-one-third">
        <div class="cart-item__thumbnail">
          <img :src="product.image1" alt="Canvas" role="presentation" />
        </div>
      </div>
      <div class="column is-two-thirds is-two-thirds-mobile">
        <h5>{{ product.title }}</h5>
        <span>(SKU: {{product.slug}})</span>
      </div>
    </div>

    <div class="columns is-mobile" v-if="product">
      <div class="column is-half cart-item__price">
        {{ price(total) }}
      </div>
      <div class="column is-half cart-item__quantity">
        <b-field>
          <b-button size="is-small" icon-right="minus" @click="changeQuantity(quantity - 1)"></b-button>
          <b-button size="is-small" disabled>{{ quantity }}</b-button>
          <b-button size="is-small" icon-right="plus" @click="changeQuantity(quantity + 1)"></b-button>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'productid',
    'quantity',
    'extras',
    'index'
  ],
  computed: {
    product() {
      const product = this.$store.state.products.filter(product => product.id === parseInt(this.productid));
      return product[0];
    },

    materials() {
      return this.$store.state.pricing;
    },

    formats() {
      return this.$store.state.formats;
    },

    productTotal() {
      let price = this.product.price * this.formats[this.extras.format].sizes[this.extras.size].price;
      let discount = (price / 100) * this.product.discount;
      price = price - discount;

      return price;
    },

    productWithExtras() {
      let price = this.productTotal;
      price = price + this.materials[this.extras.material].finishes[this.extras.finish][this.extras.format === 0 ? 'styles' : 'panoramaStyles'][this.extras.style].sizes[this.extras.size]

      if (this.extras.frame) {
        price = price + this.materials[this.extras.material].frames[this.extras.frame].sizes[this.extras.format][this.extras.size]
      }

      if (this.extras.frame && this.extras.glass) {
        price = price + this.materials[this.extras.material].glass[this.extras.glass].sizes[this.extras.format][this.extras.size]
      }

      return price;
    },
    total() {
      return this.productWithExtras * this.quantity;
    },
  },
  methods: {
    price: function(price) {
      return '$' + (Math.floor(price * 100) / 100).toFixed(2)
    },
    removeFromCart: function(index) {
      this.$store.commit('localStorage/removeFromCart', index);
      this.$buefy.toast.open({message: 'Item removed from cart.', type: 'is-warning'});
    },
    changeQuantity: function(quantity) {
      if (quantity > 0) {
        this.$store.commit('localStorage/changeQuantity', { index: this.index, quantity: quantity });
      } else {
        this.removeFromCart(this.index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart-item {
    margin: 25px 0;
    border-bottom: 1px solid $grey;
    padding-bottom: 25px;

    h5 {
      font-family: $fontBody;
      font-weight: bold;
    }

    &__sku {
      font-size: 14px;
      color: $black;
    }

    &__price {
      display: flex;
      align-items: center;
    }

    &__quantity {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__thumbnail {
      height: 100%;
      width: auto;
      display: flex;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
