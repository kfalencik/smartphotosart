<template>
  <div :class="{'page': true, 'page--home': home}">
    <div  v-if="loaded">
    <Header />
    <slideshow />
    <main keep-alive>
      <div >
        <div class="container">
          <Messages />
        </div>
        <nuxt />
      </div>
      
      <Newsletter />
    </main>
    <Footer />
    </div>
    <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
  </div>
</template>

<script>
import Header from '~/components/Header';
import Newsletter from '~/components/Newsletter';
import Footer from '~/components/Footer';
import Messages from '~/components/Messages';
import Loading from '~/components/Loading';
import Slideshow from '~/components/Slideshow.vue';

export default {
  head() {
    return {
      link: [
        { rel: 'canonical', href: 'https://www.falencik.com' + this.$route.path },
      ] 
    }
  },
  components: {
    Header,
    Newsletter,
    Footer,
    Messages,
    Loading,
    Slideshow
  },
  mounted() {
    this.$store.dispatch('getShopData');
  },
  computed: {
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
}
</script>
