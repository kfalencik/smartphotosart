<template>
  <div class="limited-edition">
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <h2>{{section.title}}</h2>
            <p>{{section.description}}</p>
            <q>{{section.quote}}</q>
            <img :src="require('@/assets' + section.signature)" alt="Peter Falencik" />
          </div>

          <div class="column is-half">
            <p>*PHOTO PLACEHOLDER*</p>
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
p {
  margin: 25px 0;
}

q {
  font-style: italic;
}

img {
  float: right;
  margin-top: 50px;
  width: 200px;
}
</style>