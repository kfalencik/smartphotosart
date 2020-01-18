<template>
  <div class="section">
    <div class="container">
      <div>
        <router-link to="/">
          <h1 class="sr-only">Iconari</h1>
          <img :src="require('@/assets/images/logo.png')" alt="Iconari" />
        </router-link>
      </div>
      <h3>Zaloguj sie do panelu sterowania</h3>

      <form class="form" @submit.prevent="login">
        <b-field class="form__input" label="Email">
          <b-input type="email" placeholder="Email" v-model="user" required></b-input>
        </b-field>

        <b-field class="form__input" label="Haslo">
          <b-input type="password" placeholder="Haslo" v-model="pass" required></b-input>
        </b-field>

        <div class="form__input form__input--buttons">
          <button type="submit" class="button is-success">Zaloguj sie</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: '',
        pass: ''
      }
    },
    methods: {
      login: function() {
        this.$store.dispatch('localStorage/authorize', [this.user, this.pass]);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .section {
    margin: 0 auto;
  }
  
  .container {
    text-align: center;

    form {
      max-width: 400px;
      margin: 0 auto;
      text-align: left;

      .form__input--buttons {
        text-align: center;
      }
    }
  }
</style>