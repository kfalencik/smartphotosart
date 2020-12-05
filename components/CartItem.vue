<template>
  <div class="cart-item">
    <div class="columns" v-if="product">
      <div class="column is-one-third">
        <img :src="product.image1" alt="Canvas" />
      </div>
      <div class="column is-two-thirds">
        <h5>{{ product.title }}</h5>
        <span>(SKU: {{product.slug}})</span>
      </div>
    </div>

    <!-- <td class="cart-item__extras">
      <strong>Material: </strong> {{ materials[extras.material].title }},

      <template v-if="materials[extras.material].finishes">
        <strong>Media: </strong>
        <span>{{ materials[extras.material].finishes[extras.finish].title }},</span>
      </template>

      <template v-if="materials[extras.material].finishes[extras.finish].styles">
        <strong>Style: </strong>
        <span >{{ materials[extras.material].finishes[extras.finish].styles[extras.style].title }},</span>
      </template>

      <template v-if="materials[extras.material].frames">
        <strong>Frame: </strong>
        <span v-if="materials[extras.material].frames">{{ materials[extras.material].frames[extras.frame].title }},</span>
      </template>

      <template v-if="materials[extras.material].glass">
      <strong>Glass: </strong>
      <span v-if="materials[extras.material].glass">{{ materials[extras.material].glass[extras.glass].title }},</span>
      </template>

      <template>
        <strong>Size: </strong>
        <span >{{ formats[extras.format].sizes[extras.size].title }} <span v-if="extras.format !== 0">({{ formats[extras.format].title }})</span></span>
      </template>
    </td>

    <td class="cart-item__quantity">
      {{ quantity }}
    </td>

    <td class="cart-item__price">
      {{ price(total) }}
    </td> -->
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
    }

    &__sku {
      font-size: 14px;
      color: $black;
    }

    &__extras {
      font-size: 15px;
    }

    &__thumbnail {
      height: 80px;
      width: auto;

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
    }
  }
</style>
