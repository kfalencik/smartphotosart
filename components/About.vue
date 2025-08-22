<template>
  <div class="about-me">
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <h2>{{section.title}}</h2>
            <div v-html="section.description"></div>
            <q>{{section.quote}}</q>
            <img :src="'/assets' + section.signature" width="200" alt="Peter Falencik" />
          </div>

          <div class="column has-text-centered is-half">
            <img src="/assets/images/peterfalencik.jpg" width="680" alt="Peter Falencik" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    section () {
      return this.$store.state.homepage.section1;
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: -102px;
}

h2 {
  text-align: center;

  @media (min-width: $medium) {
    text-align: left;
  }
}

p {
  margin: 25px 0;
}

q {
  font-style: italic;
}

.column {
  &:first-child {
    img {
      margin: 50px 0 35px;
      float: right;
    }
  }

  @media (min-width: $medium) {
     &:last-child {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>