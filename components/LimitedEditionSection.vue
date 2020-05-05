<template>
  <div class="limited-edition">
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-full" v-for="(item, index) in sections.section2.columns" :key="index">
            <div class="limited-edition__item">
              <div class="limited-edition__icon">
                <img width="200" :src="require('@/assets/images/icons/' + item.icon)" :alt="item.title" />
              </div>

              <div class="limited-edition__text">
                <h3>{{item.title}}</h3>
                <p>{{item.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    sections () {
      return this.$store.state.homepage;
    }
  }
}
</script>

<style lang="scss" scoped>
.limited-edition {
  position: relative;
  background: $primary;

  &__item {
    display: flex;
    align-items: center;

    @media (max-width: $medium) {
      flex-direction: column;
      padding: 25px 0;
      text-align: center;
    }
  }

  &__icon {
    flex: 0 0 200px;
    margin-right: 30px;

    @media (max-width: $medium) {
      margin: 0 0 20px 0;
    }
  }
}
</style>