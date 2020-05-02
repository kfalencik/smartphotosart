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
  background: $black;
  color: $white;
  position: relative;
  
  @include goldFrame;

  &__item {
    display: flex;
    align-items: center;
  }

  &__icon {
    flex: 0 0 200px;
    margin-right: 30px;
  }
}
</style>