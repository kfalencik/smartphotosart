<template>
  <header class="header">
    <div class="section">
      <div class="header__wrapper">
        <div class="header__left">
          <div class="header__logo">
            <router-link to="/">
              <h1 class="sr-only">Smart Photos Art</h1>
              <img src="~/assets/images/logo.svg" alt="Smart Photos Art" />
            </router-link>
          </div>
        </div>

        <div class="header__center">
          <div class="header__navigation">
            <button class="button is-secondary" @click.stop.prevent="toggleMenu"><b-icon icon="menu" custom-size="mdi-24px"></b-icon> <span>&nbsp;Shop by category</span></button>
            <nav :class="{'header__main-nav': true, 'active': navigation}">
              <ul>
                <li>
                  <a @click.prevent="allCategories">All categories</a>
                </li>
                <li v-for="(category, index) in categories" :key="index">
                  <a @click.prevent="selectCategory(category.slug)">{{category.title}}</a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="header__search">
            <form @submit.stop.prevent="search">
              <label class="sr-only" for="search">Search</label>
              <input id="search" class="input input--inline" v-model="searchKeyword" placeholder="Search for..." />
              <button type="submit" @click.stop.prevent="search" class="button is-primary"><span class="sr-only">Search</span><b-icon icon="magnify" custom-size="mdi-24px"></b-icon></button>
            </form>
          </div>
        </div>

        <div class="header__right">
          <div class="header__user-menu">
            <nav>
              <ul>
                <!-- <li>
                  <router-link to="/user-profile">
                    <b-icon icon="account-outline" custom-size="mdi-24px"><span class="sr-only">Your account</span></b-icon>
                  </router-link>
                </li> -->
                <li>
                  <router-link to="/shop/cart">
                    <b-icon icon="cart-outline" custom-size="mdi-24px"></b-icon>
                    <span class="header__notification-indicator">{{ totalCart }} <span class="sr-only">products in cart</span></span>
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default{
    data() {
      return {
        siteName: 'Smart Photos Art',
        navigation: false,
        searchKeyword: ''
      }
    },
    mounted() {
      const self = this;

      document.body.addEventListener('click', function(event) {
        self.navigation = false;
      });
    },
    computed: {
      categories() {
        return this.$store.state.categories;
      },
      cart() {
        return this.$store.state.localStorage.cart;
      },
      totalCart() {
        let total = 0;

        this.cart.forEach(item => {
          total = total + item.quantity;
        });

        return total;
      }
    },
    methods: {
      toggleMenu: function(event) {
        this.navigation = !this.navigation;
      },
      allCategories: function() {
        this.$store.commit('toggleFilterCategory', []);
        this.$store.dispatch('filterProducts');
        this.$store.commit('sortProducts', 'popularity-az');
        this.$router.push('/shop');
      },
      selectCategory: function(slug) {
        this.$store.commit('setFilterCategory', slug);
        this.$store.dispatch('filterProducts');
        this.$store.commit('sortProducts', 'popularity-az');
        this.$router.push('/shop');
      },
      search: function() {
        this.$store.commit('setSearchKeyword', this.searchKeyword);
        this.$store.dispatch('filterProducts');
        this.$store.commit('sortProducts');
        this.$router.push('/shop');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    border-bottom: 1px solid lighten($lightgrey, 40%);

    .section {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    &__wrapper {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__logo {
      width: 100px;

      img {
        display: block;
      }

      @media (min-width: $medium) {
        width: 150px;
        margin-right: 25px;
      }
    }

    &__left {
      order: 2;

      @media (min-width: $medium) {
        order: 1;
      }
    }

    &__right {
      order: 3;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }

    &__center {
      order: 1;

      @media (min-width: $medium) {
        order: 2;
        width: 100%;
        max-width: 1180px;
        display: flex;
        flex-direction: row;
      }
    }

    &__search {
      display: none;

      form {
        padding-top: 0;

        .is-primary {
          background-color: $black;
          border-color: $black;
        }
      }

      @media (min-width: $medium) {
        display: block;
        width: 100%;
      }

      form {
        display: flex;
        flex-direction: row;
      }
    }

    &__navigation {
      position: relative;

      @media (min-width: $medium) {
        margin-right: 20px;
      }

      button {
        .icon {
          margin: 0 !important;
        }

        span:last-child {
          display: none
        }

        @media (min-width: $large) {
          min-width: 260px;

          span:last-child {
            display: initial;
          }
        }
      }
    }

    &__main-nav {
      position: absolute;
      opacity: 0;
      z-index: 20;
      left: 0;
      width: 100%;
      min-width: 250px;
      top: 50px;
      background: $white;
      border-radius: 3px;
      padding: 5px 20px 0px;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.15);
      border: 2px solid $lightgrey;
      transition: all .3s ease;
      transform: scaleY(0);
      transform-origin: top;

      &.active {
        opacity: 1;
        transform: scaleY(1);
      }

      @media (min-width: $medium) {
        left: -100px;

        &::before {
          bottom: 100%;
          left: 50%;
          border: solid transparent;
          content: " ";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-color: rgba(194, 225, 245, 0);
          border-bottom-color: $lightgrey;
          border-width: 20px;
          margin-left: -20px;
        }

        &::after {
          bottom: 100%;
          left: 50%;
          border: solid transparent;
          content: " ";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-color: rgba(136, 183, 213, 0);
          border-bottom-color: $white;
          border-width: 17px;
          margin-left: -17px;
        }
      }

      @media (min-width: $large) {
        left: 0;
      }

      ul {
        margin-left: 0;
      }

      li {
        list-style: none;
        padding: 0;
        width: 100%;
        height: auto;
        position: relative;
        border-bottom: 1px solid #ddd;
        float: none;
        transition: all .3s ease;

        &:hover {
          border-color: $tertiary;
        }

        a {
          padding: 12px 0;
          display: block;
          font-size: 0.8em;
          color: $black;
        }
      }
    }

    &__notification-indicator {
      background: $tertiary;
      color: $white;
      width: 15px;
      height: 15px;
      position: absolute;
      border-radius: 100%;
      font-size: 0.6em;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      right: -5px;
      bottom: -5px;
    }

    &__user-menu {
      text-align: right;

      @media (min-width: $medium) {
        width: 100px;
      }

      ul {
        margin-left: 0;
      }

      li {
        list-style: none;
        padding: 0;
        display: inline-block;
        margin-left: 10px;

        a {
          position: relative;
          color: $black;
        }
      }
    }
  }
</style>
