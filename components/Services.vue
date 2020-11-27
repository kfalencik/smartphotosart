<template>
  <div class="services">
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="services__item column is-one-fifth">
            <div>
              <img :src="require('@/assets/images/icons/icon-shipping.png')" alt="" role="presentation" />
              <h5>Free Shipping</h5>
              <p>We provide free shipping in USA</p>
            </div>
          </div>
          <div class="services__item column is-one-fifth">
            <div>
              <img :src="require('@/assets/images/icons/icon-payments.png')" alt="" role="presentation" />
              <h5>Safe payments</h5>
              <p>Secure payment system with PayPal</p>
            </div>
          </div>
          <div class="services__item column is-one-fifth">
            <div>
              <img :src="require('@/assets/images/icons/icon-discounts.png')" alt="" role="presentation" />
              <h5>Discounts</h5>
              <p>Opportunities to save money everywhere</p>
            </div>
          </div>
          <div class="services__item column is-one-fifth">
            <div>
              <img :src="require('@/assets/images/icons/icon-custom.png')" alt="" role="presentation" />
              <h5>Custom orders</h5>
              <p>Order bespoke sized products</p>
            </div>
          </div>
          <div class="services__item column is-one-fifth">
            <div>
              <img :src="require('@/assets/images/icons/icon-support.png')" alt="" role="presentation" />
              <h5>Support 24/7</h5>
              <p>Get our help anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .services {
    z-index: 20;
    margin-bottom: -50px;

    &__item {
      text-align: center;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 15px 0;
      border-right: 1px solid $primary;

      @media (max-width: $medium) {
        border: none;
      }

      img {
        width: 100px;
        margin-bottom: 10px;
      }

      p {
        margin-top: 0;
        font-size: 0.8em;
      }

      &:last-child {
        border-right: none;
        border-bottom: none;
      }
    }
  }
</style>
