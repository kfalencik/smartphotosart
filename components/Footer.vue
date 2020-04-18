<template>
  <footer class="footer">
    <div class="footer__bottom">
      <div class="section">
        <div class="footer__left">
          Copyright @ 2020 Smart Photos Art - All rights reserved
        </div>
        <div class="sr-only">
          <a rel="noreferrer" href="https://www.facebook.com/Iconarishop/" target="_blank">Facebook</a>
        </div>
        <div class="footer__right">
          <nav>
            <ul>
              <li><router-link to="/legal/privacy-policy">Privacy Policy</router-link></li>
              <li><router-link to="/legal/returns-policy">Returns policy</router-link></li>
              <li><router-link to="/legal/terms-conditions">Terms & Conditions</router-link></li>
              <li><router-link to="/legal/cookie-policy">Cookie policy</router-link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    padding: 0;

    &__bottom {
      background: lighten($lightgrey, 40%);
      font-size: 0.8em;

      .section {
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        @media (min-width: $medium) {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
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
            margin-left: 10px;
          }

          a {
            color: $black;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
