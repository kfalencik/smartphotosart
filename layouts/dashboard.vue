<template>
  <div>
    <div v-if="!loading" class="dashboard">
      <template v-if="authorized">
        <div class="sidebar">
          <router-link to="/">
            <h1 class="sr-only">Peter Falencik Photography</h1>
            <img src="logo.png" alt="Peter Falencik Photography" />
          </router-link>

          <nav>
            <ul>
              <li>
                <router-link to="/dashboard/orders">Zamowienia</router-link>
              </li>
              <li>
                <router-link to="/dashboard/products">Produkty</router-link>
              </li>
              <li>
                <router-link to="/dashboard/discounts">Kody promocyjne</router-link>
              </li>
              <!-- <li>
                <router-link to="/dashboard/newsletter">Newsletter</router-link>
              </li> -->
              <!-- <li>
                <router-link to="/dashboard/images">Galeria</router-link>
              </li> -->
            </ul>
          </nav>

          <button class="logout button is-secondary" @click.prevent="logout">Wyloguj sie</button>
        </div>

        <div class="content">
          <Messages />
          <nuxt />
        </div>
      </template>

      <loginForm v-else />
    </div>

    <b-loading :is-full-page="true" :active.sync="loading"></b-loading>

  </div>
</template>

<script>
import Loading from '~/components/Loading';
import Messages from '~/components/Messages';
import LoginForm from '~/components/LoginForm';

export default {
  head () {
    return {
      title: 'Peter Falencik Photography - Dashboard',
    }
  },
  components: {
    Loading,
    Messages,
    LoginForm
  },
  mounted() {
    this.$store.dispatch('getShopData');
  },
  computed: {
    authorized() {
      return this.$store.state.localStorage.authorized;
    },
    loaded() {
      return this.$store.state.loaded;
    },
    redirecting() {
      return this.$store.state.redirecting;
    },
    home() {
      return this.$route.name === 'index'
    },
    loading() {
      if (!this.loaded || this.redirecting) {
        return true;
      }
    }
  },
  methods: {
    logout: function() {
      this.$store.commit('localStorage/logout');
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar {
    padding: 50px;
    border-right: 1px solid lighten($lightgrey, 40%);
    min-height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: lighten($lightgrey, 40%);
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 250px;

    nav {
      margin-top: 35px;
      text-align: left;

      ul {
        margin-left: 0;
        list-style: none;
      }

      li {
        padding: 0;
      }

      a {
        color: $black;
        font-weight: bold;
        display: block;
        padding: 15px 0;
        border-bottom: 1px solid $white;
      }
    }

    .logout {
      margin-top: auto;
    }
  }

  .content {
    width: 100%;
    padding: 50px;
    width: calc(100% - 250px);
    float: right;

    ul {
      margin: 0;
      list-style: none;
    }
  }
</style>

<style lang="scss">
  .pagination-list {
    ul {
      margin: 0;
      list-style: none;
    }
  }
</style>