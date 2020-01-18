<template>
  <div class="key-points">
    <div class="section">
      <div class="container">
        <h3>Our products</h3>
        <div class="columns">

          <div class="column">
            <b-icon icon="shield-outline" size="is-large" />
            <h4>Durable</h4>
            <p>Our Canvas won't tear or rip, it's extremely durable compared to paper print.</p>
          </div>

          <div class="column">
            <b-icon icon="eye-outline" size="is-large" />
            <h4>Unique</h4>
            <p>The three-dimensional structure of the canvas itself naturally draws the eye.</p>
          </div>

          <div class="column">
            <b-icon icon="brush" size="is-large" />
            <h4>Vibrant</h4>
            <p>The colors and texturing on canvas art stand out and make for a bolder visual piece.</p>
          </div>

          <div class="column">
            <b-icon icon="texture" size="is-large" />
            <h4>Raw</h4>
            <p>Canvas lets you focus on the power of the image you’ve chosen, not the glossiness of paper.</p>
          </div>

          <div class="column">
            <b-icon icon="cloud-outline" size="is-large" />
            <h4>Light</h4>
            <p>Never damage your walls with heavy framing that adds nothing to the art.</p>
          </div>

          <div class="column">
            <b-icon icon="flower" size="is-large" />
            <h4>Sustainable</h4>
            <p>Our canvas is built from US-sourced recycled material known as MDF.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .key-points {
    background: $tertiary;
    color: $secondary;
    padding-bottom: 25px;
    margin: 50px 0;

    .icon {
      margin-bottom: 25px;
    }

    h3 {
      margin-bottom: 35px;
      text-align: center;
    }

    .columns {
      text-align: center;
      justify-content: space-between;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 320px;
        border: 1px solid $lightgrey, 20%;
        padding: 20px;
        background: #fff;
        margin: 10px 15px;
        text-align: center;
      }
    }
  }
</style>
