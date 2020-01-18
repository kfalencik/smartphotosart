<template>
  <div class="newsletter">
    <div class="section">
      <div class="container">
        <div><b-icon icon="email-outline" custom-size="mdi-36px"></b-icon></div>
        <h3>Join our newsletter</h3>
        <p>Sign up to our newsletter and get <strong>25% off</strong> your next order. Pretty sweet, we know!</p>
        <form @submit.stop.prevent="addNewsletter">
          <label class="sr-only" for="newsletter-email">Email address</label>
          <input id="newsletter-email" class="input input--secondary input--inline" type="email" v-model="email" placeholder="Your email address" />
          <button class="button button--secondary" type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    addNewsletter: function() {
      if (this.email !== '') {
        if (this.validateEmail(this.email)) {
          this.$store.commit('addNewsletter', this.email);
        } else {
          this.$buefy.toast.open({message: 'Please provide a valid email address.', type: 'is-danger'});
        }
      }
    },
    validateEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
}
</script>

<style lang="scss" scroped>
  .newsletter {
    background: $secondary;
    color: #fff;
    margin-top: 50px;

    h3 {
      margin-top: 0;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: row;
    }
  }
</style>
