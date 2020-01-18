<template>
  <tr class="cart-item">
    <td class="cart-item__thumbnail">
      <img :src="require('@/assets/products/' + product.canvasImage)" alt="Canvas" />
    </td>
    <td class="cart-item__title">
      {{ product.title }}
    </td>

    <td class="cart-item__extras">
      <strong>Size: </strong> {{ prices[sizeOption].title }},

      <strong>Thickness: </strong>
      <span v-if="prices[sizeOption].thickness">{{ prices[sizeOption].thickness[thicknessOption].title }},</span>
      <span v-else>{{ prices[0].thickness[thicknessOption].title }},</span>

      <strong>Edge: </strong>
      <span v-if="prices[sizeOption].edge">{{ prices[sizeOption].edge[edgeOption].title }},</span>
      <span v-else>{{ prices[0].edge[edgeOption].title }},</span>

      <strong>Frame: </strong>
      <span v-if="prices[sizeOption].frame">{{ prices[sizeOption].frame[frameOption].title }}</span>
      <span v-else>{{ prices[0].frame[frameOption].title }}</span>
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
      sizeOption: this.extras[0],
      thicknessOption: this.extras[1],
      edgeOption: this.extras[2],
      frameOption: this.extras[3]
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
      price = price + this.prices[this.sizeOption].price;

      if (this.prices[this.sizeOption].thickness) {
        price = price + this.prices[this.sizeOption].thickness[this.thicknessOption].price;
      }

      if (this.prices[this.sizeOption].edge) {
        price = price + this.prices[this.sizeOption].edge[this.edgeOption].price;
      }

      if (this.prices[this.sizeOption].frame) {
        price = price + this.prices[this.sizeOption].frame[this.frameOption].price;
      }

      return price;
    },
    extrasTotal() {
      let price = this.prices[this.sizeOption].price;

      if (this.prices[this.sizeOption].thickness) {
        price = price + this.prices[this.sizeOption].thickness[this.thicknessOption].price;
      }

      if (this.prices[this.sizeOption].edge) {
        price = price + this.prices[this.sizeOption].edge[this.edgeOption].price;
      }

      if (this.prices[this.sizeOption].frame) {
        price = price + this.prices[this.sizeOption].frame[this.frameOption].price;
      }

      return price;
    },
    total() {
      return this.productWithExtras * this.quantity;
    },
  },
  methods: {
    price: function(price) {
      return '$' + (Math.round(price * 100) / 100).toFixed(2)
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
