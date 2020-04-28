<template>
  <tr class="cart-item">
    <td class="cart-item__thumbnail">
      <img :src="require('@/assets/products/' + product.canvasImage)" alt="Canvas" />
    </td>
    <td class="cart-item__title">
      {{ product.title }}
    </td>

    <td class="cart-item__extras">
      <strong>Material: </strong> {{ prices[materialOption].title }},

      <template v-if="prices[materialOption].finish">
        <strong>Media: </strong>
        <span v-if="prices[materialOption].finish">{{ prices[materialOption].finish[finishOption].title }},</span>
      </template>

      <template v-if="prices[materialOption].finish[finishOption].styles">
        <strong>Style: </strong>
        <span >{{ prices[materialOption].finish[finishOption].styles[stylesOption].title }},</span>
      </template>

      <template v-if="prices[materialOption].finish[finishOption].backing">
        <strong>Backing: </strong>
        <span >{{ prices[materialOption].finish[finishOption].backing[backingOption].title }},</span>
      </template>

      <template v-if="prices[materialOption].frame">
        <strong>Frame: </strong>
        <span v-if="prices[materialOption].frame">{{ prices[materialOption].frame[frameOption].title }},</span>
      </template>

      <template v-if="prices[materialOption].glass">
      <strong>Glass: </strong>
      <span v-if="prices[materialOption].glass">{{ prices[materialOption].glass[glassOption].title }},</span>
      </template>

      <template v-if="prices[materialOption].finish[finishOption].size">
        <strong>Size: </strong>
        <span >{{ prices[materialOption].finish[finishOption].size[sizeOption].title }}</span>
      </template>
    </td>

    <td class="cart-item__quantity">
      {{ quantity }}
    </td>

    <td class="cart-item__price">
      {{ price(total) }}
    </td>

    <td>
      <button class="button is-danger" @click="removeFromCart(index)"><b-icon icon="minus"></b-icon></button>
    </td>
  </tr>
</template>

<script>
export default {
  props: [
    'productid',
    'quantity',
    'extras',
    'index'
  ],
  data() {
    return {
      materialOption: this.extras[0],
      finishOption: this.extras[1],
      stylesOption: this.extras[2],
      sizeOption: this.extras[3],
      frameOption: this.extras[4],
      glassOption: this.extras[5],
      backingOption: this.extras[6]
    }
  },
  computed: {
    product() {
      const product = this.$store.state.products.filter(product => product.id === parseInt(this.productid));
      return product[0];
    },
    prices() {
      return this.$store.state.prices;
    },
    productTotal() {
      let price = this.product.price;
      let discount = (price / 100) * this.product.discount;
      price = price - discount;

      return price;
    },
    productWithExtras() {
      let price = this.productTotal;
      price = price + this.prices[this.materialOption].price;

      if (this.prices[this.materialOption].finish[this.finishOption].size) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].size[this.sizeOption].price;
      }

      if (this.prices[this.materialOption].finish) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].price;
      }

      if (this.prices[this.materialOption].finish[this.finishOption].styles) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].styles[this.stylesOption].price;
      }

      if (this.prices[this.materialOption].finish[this.finishOption].backing) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].backing[this.backingOption].price;
      }

      if (this.prices[this.materialOption].glass) {
        price = price + this.prices[this.materialOption].glass[this.glassOption].price;
      }

      if (this.prices[this.materialOption].frame) {
        price = price + this.prices[this.materialOption].frame[this.frameOption].price;
      }

      return price;
    },
    total() {
      return this.productWithExtras * this.quantity;
    },
  },
  mounted() {
    console.log(this.prices, this.backingOption);
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
    td {
      padding: 10px;
      vertical-align: middle;

      @media (max-width: $medium) {
        display: block;
      }
    }

    &__thumbnail {
      height: 80px;
      width: 200px;

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
    }
  }
</style>
