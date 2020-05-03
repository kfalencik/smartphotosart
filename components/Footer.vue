<template>
  <footer class="footer">
    <div class="footer__bottom">
      <div class="section">
        <div class="footer__left">
          <span>Copyright @ 2020 Smart Photos Art - All rights reserved</span>
        </div>
        <div class="footer__ceter">
          <nav>
            <ul>
              <li><router-link to="/legal/privacy-policy">Privacy Policy</router-link></li>
              <li><router-link to="/legal/returns-policy">Returns policy</router-link></li>
              <li><router-link to="/legal/terms-conditions">Terms & Conditions</router-link></li>
              <li><router-link to="/legal/cookie-policy">Cookie policy</router-link></li>
            </ul>
          </nav>
        </div>
        <div class="sr-only">
          <a rel="noreferrer" href="https://www.facebook.com/Iconarishop/" target="_blank">Facebook</a>
        </div>
        <div class="footer__right">
          <img src="/payment-methods.png" width="200" alt="" role="presentation" />
          <img src="/paypal-verified.png" width="50" alt="" role="presentation" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    padding: 0;

    &__bottom {
      background: $black;
      color: $white;
      font-size: 0.8em;

      .section {
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        @media (min-width: $large) {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    &__right {
      display: flex;
      align-items: center;

      img {
        margin-left: 15px;
      }
    }

    nav {
      ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin-left: 0;

        @media (min-width: $small) {
          flex-direction: row;
        }

        li {
          text-align: center;

          @media (min-width: $small) {
            text-align: left;
            margin: 0 10px;
          }

          a {
            color: $white;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
