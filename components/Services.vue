<template>
  <div class="section">
    <div class="container">
      <div class="columns services">
        <div class="services__item column is-one-fifth">
          <div>
            <b-icon icon="ferry" custom-size="mdi-24px"></b-icon>
            <h5>Free Shipping</h5>
            <p>We provide free shipping in USA</p>
          </div>
        </div>
        <div class="services__item column is-one-fifth">
          <div>
            <b-icon icon="lock-outline" custom-size="mdi-24px"></b-icon>
            <h5>Safe payments</h5>
            <p>Secure payment system with PayPal</p>
          </div>
        </div>
        <div class="services__item column is-one-fifth">
          <div>
            <b-icon icon="wallet-giftcard" custom-size="mdi-24px"></b-icon>
            <h5>Discounts</h5>
            <p>Opportunities to save money everywhere</p>
          </div>
        </div>
        <div class="services__item column is-one-fifth">
          <div>
            <b-icon icon="cash-100" custom-size="mdi-24px"></b-icon>
            <h5>Money Back</h5>
            <p>100% money back return policy</p>
          </div>
        </div>
        <div class="services__item column is-one-fifth">
          <div>
            <b-icon icon="help-circle-outline" custom-size="mdi-24px"></b-icon>
            <h5>Support 24/7</h5>
            <p>Get our help anytime</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .services {
    border: 1px solid lighten($lightgrey, 40%);
    border-radius: 3px;

    &__item {
      text-align: center;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 15px 0;
      border-bottom: 1px solid lighten($lightgrey, 40%);

      @media (min-width: $large) {
        border-right: 1px solid lighten($lightgrey, 40%);
        border-bottom: none;
      }

      p {
        font-size: 0.8em;
        color: $lightgrey;
      }

      &:last-child {
        border-right: none;
        border-bottom: none;
      }
    }
  }
</style>
