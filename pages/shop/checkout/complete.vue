<template>
    <div class="section">
        <div class="container">
            <div v-if="loaded">
                <div v-if="orderDetails.details">
                    <b-icon type="is-success" icon="check-circle-outline success" size="is-large"></b-icon>
                    <h2>Your order is complete!</h2>
                    <p>Your order id is: <strong>{{orderDetails.paypal.orderID}}</strong></p>
                    <p>Please keep a note of your order id as it will serve as a reference to this order in case of any questions or problems.</p>
                    <p>We have sent you an email to the address you provided during checkout with all the details of this transaction.</p>
                    <p>We will send you any updates or changes to this order to the same email address.</p>
                    <p>If you wish to make any changes or cancel this order please contact us using the messenger app or email at <a href="mailto:studio@falencik.com">studio@falencik.com</a></p>

                    <router-link to="/shop"><strong>Go back to our shop</strong></router-link>
                </div>
                <p v-else>Something went wrong please go back to our <router-link to="/shop">shop</router-link>.</p>
            </div>
        </div>
    </div>
</template>

<script>
import CartItem from '~/components/CartItem';

export default {
  head () {
    return {
      title: 'Peter Falencik Photography - Order complete',
    }
  },
  computed: {
    loaded() {
      return this.$store.state.localStorage.status
    },
    orderDetails() {
      return this.$store.state.localStorage.order
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    text-align: center;

    .icon {
      color: $primary;
    }

    h2 {
      margin-top: 20px;
    }

    p {
      margin: 15px 0;
    }
  }
</style>
