<template>
  <div class="key-points">
    <div class="section">
      <div class="container">
        <h3>Why us?</h3>
        <div class="columns">

          <div class="column">
            <img :src="require('@/assets/images/icons/icon-art.png')" width="100" alt="" role="presentation" />
            <h4>Art</h4>
            <p>We believe photography is an Art and a photographer as a creator is able to change your perception of feeling, affects our emotions. Be a part of it!</p>
          </div>

          <div class="column">
            <img :src="require('@/assets/images/icons/icon-inspiration.png')" width="100" alt="" role="presentation" />
            <h4>Inspiration</h4>
            <p>Peter Falencik’s photography crates amazing atmosphere, inspires people to change their space around them.</p>
          </div>

          <div class="column">
            <img :src="require('@/assets/images/icons/icon-unique.png')" width="100" alt="" role="presentation" />
            <h4>Unique</h4>
            <p>“You don’t take the photograph. You make it.”- Abel Adams The artwork we present is unique and it’s created for You</p>
          </div>

          <div class="column">
            <img :src="require('@/assets/images/icons/icon-limited-edition.png')" width="100" alt="" role="presentation" />
            <h4>Limited Edition</h4>
            <p>We share our unique, valuable concepts with only exceptional, small number of customers.</p>
          </div>

          <div class="column">
            <img :src="require('@/assets/images/icons/icon-your-space.png')" width="100" alt="" role="presentation" />
            <h4>Your space</h4>
            <p>The artistic photography we offer is a reason to create and change your space.</p>
          </div>

          <div class="column">
            <img :src="require('@/assets/images/icons/icon-hd.png')" width="100" alt="" role="presentation" />
            <h4>High Quality</h4>
            <p>Our product is always printed on the finest quality materials so you can enjoy them for decades. We are Eco too!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .key-points {
    background-color: $primary;
    color: $black;
    padding-bottom: 25px;
    margin: 50px 0 0;

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
        padding: 20px;
        background: $white;
        margin: 10px 15px;
        text-align: center;

        img {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
