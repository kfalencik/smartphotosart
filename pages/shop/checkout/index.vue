<template>
  <div class="section">
    <div class="container">
      <div>
        <router-link to="/shop/cart">Go back to the cart</router-link>
      </div>

      <h2>Checkout</h2>

      <template v-if="cart.length > 0 || loading">
        <div class="columns">
          <div class="column">
            <div class="checkout-panel">
              <div class="header">
                <h4>Personal Information <b-icon icon="human-greeting" /></h4>
              </div>

              <div class="content">
                <form>
                  <div class="columns">
                    <div class="column is-one-third">
                      <b-field label="Title*">
                        <b-select name="title" icon="clipboard-account" placeholder="Title" v-model="personalTitle" expanded required :disabled="checkoutValidation">
                          <option selected value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                          <option value="Ms">Ms</option>
                          <option value="Dr">Dr</option>
                          <option value="Prof">Prof</option>
                        </b-select>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="First Name*">
                        <b-input name="firstname" icon="clipboard-account" placeholder="First name" v-model="personalFirstName" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Last Name*">
                        <b-input name="lastname" icon="clipboard-account" placeholder="Last name" v-model="personalLastName" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column is-one-third">
                      <b-field label="Email address*">
                        <b-input name="email" icon="at" placeholder="Email address" type="email" v-model="personalEmail" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Phone number*">
                        <b-input name="phone" icon="cellphone" placeholder="Phone number" v-model="personalPhone" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Company Name">
                        <b-input name="company" icon="domain" placeholder="Company name" v-model="personalCompanyName" :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="checkout-panel">
              <div class="header">
                <h4>Delivery information <b-icon icon="truck" /></h4>
              </div>

              <div class="content">
                <form>
                  <div class="columns">
                    <div class="column is-one-third">
                      <b-field label="Address line 1*">
                        <b-input name="ship-address" icon="map-marker" placeholder="Address 1" v-model="deliveryAddress1" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Address line 2">
                        <b-input name="ship-address2" icon="map-marker" placeholder="Optional" v-model="deliveryAddress2" :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Address line 3">
                        <b-input name="ship-address3" icon="map-marker" placeholder="Optional" v-model="deliveryAddress3" :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column is-one-third">
                      <b-field label="City*">
                        <b-input name="ship-city" icon="city" placeholder="City" v-model="deliveryCity" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Zip code*">
                        <b-input name="ship-zipcode" icon="map-marker" placeholder="Zip code" v-model="deliveryZipCode" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="State">
                        <b-select name="ship-state" icon="map" placeholder="State" v-model="deliveryState" required expanded :disabled="checkoutValidation">
                          <option selected value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="DC">District Of Columbia</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                        </b-select>
                      </b-field>
                    </div>
                  </div>

                  <div class="columns" v-if="!checkoutValidation">
                    <div class="column">
                      <div class="checkout-panel checkout-panel--confirm">
                        <button class="button is-success" type="button" @click.stop="validateDetails">Confirm and pay</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="column is-narrow">
            <div class="checkout-panel checkout-panel--pay">
              <div class="header">
                <h4>Your total - ${{priceFormatter(total + tax)}}</h4>
                <img src="/payment-methods.png" width="200" alt="" role="presentation" />
              </div>

              <div class="content" v-if="checkoutValidation">
                <p>Your details have been now saved. Please pay by clicking on the button below or <a @click.stop="checkoutValidation = false">edit your details</a>.</p>
                <client-only>
                  <paypal-checkout
                    :amount="priceFormatter(total + tax).toString()"
                    :details="{
                      tax: priceFormatter(tax),
                      subtotal: priceFormatter(total).toString()
                    }"
                    currency="USD"
                    :env="credentials.env"
                    :client="credentials"
                    :items="cartProducts"
                    :button-style="buttonStyle"
                    @payment-authorized="paymentAuthorized"
                    @payment-complete="paymentComplete"
                    @payment-cancelled="paymentCancelled"
                    :experience="experienceOptions"
                  >
                  </paypal-checkout>
                </client-only>

                <div id="paypal-button-container"></div>
                  <script src="https://www.paypal.com/sdk/js?client-id=ARz-zZbhI3do6XeIvY0-Ft4r47YJRhr6ZpN4-WxBRW-yNPoZhBJq8LkFTMRuvB1B_yD-pS-tbike3yx_&currency=USD" data-sdk-integration-source="button-factory"></script>
                  <script>
                    
                  </script>
              </div>

              <div v-else>
                <p>Please fill in all the details to complete your order.</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <p v-else>There are no items in your cart. Please add some items from <router-link to="/shop">our shop</router-link> first.</p>
      

      <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
    </div>
  </div>
</template>

<script>
export default {
    head () {
      return {
        title: 'Smart Photos Art - Checkout',
      }
    },
    data() {
        return {
        loading: false,
        tax: 0,
        credentials: {
          env: process.env.PP_ENV,
          sandbox: process.env.PP_CID,
          production: process.env.PP_CIDD
        },
        experienceOptions: {
          name: "Smart Photos Art",
          presentation: {
            brand_name: "Smart Photos Art",
            logo_image: "http://localhost:3000/_nuxt/assets/images/logo.svg"
          },
          input_fields: {
            no_shipping: 1
          }
        },
        buttonStyle: {
          label: 'paypal',
          size:  'responsive',
          shape: 'rect',
          color: 'black',
          tagline: 'false'
        },
        checkoutStep: 1,
        checkoutValidation: false,
        personalTitle: 'Mr',
        personalFirstName: '',
        personalLastName: '',
        personalCompanyName: '',
        personalEmail: '',
        personalPhone: '',
        deliveryAddress1: '',
        deliveryAddress2: '',
        deliveryAddress3: '',
        deliveryCity: '',
        deliveryZipCode: '',
        deliveryState: 'AL'
      }
    },
    computed: {
      cart() {
        return this.$store.state.localStorage.cart
      },
      discount() {
        return this.$store.state.localStorage.discount;
      },
      discounts() {
        return this.$store.state.discounts;
      },
      prices() {
        return this.$store.state.prices;
      },
      total() {
        let price = 0;

        this.cart.forEach(item => {
          let product = this.product(item.product);
          let productPrice = product.price;
          let productDiscount = (productPrice / 100) * product.discount;
          productPrice = productPrice - productDiscount;
          productPrice = productPrice + this.prices[item.extras[0]].price;

          if (this.prices[item.extras[0]].finish) {
           productPrice = productPrice + this.prices[item.extras[0]].finish[item.extras[1]].price;
          }

          if (this.prices[item.extras[0]].styles) {
            productPrice = productPrice + this.prices[item.extras[0]].styles[item.extras[2]].price;
          }

          if (this.prices[item.extras[0]].size) {
            productPrice = productPrice + this.prices[item.extras[0]].size[item.extras[3]].price;
          }

          if (this.prices[item.extras[0]].frame) {
            productPrice = productPrice + this.prices[item.extras[0]].frame[item.extras[4]].price;
          }

          if (this.prices[item.extras[0]].mount) {
            productPrice = productPrice + this.prices[item.extras[0]].mount[item.extras[5]].price;
          }

          price = price + (productPrice * item.quantity);
        });

        if (this.discount) {
          price = price - ((price / 100) * this.discounts[this.discount].discount);
        }

        this.tax = Math.floor(((price / 100) * 7).toFixed(2));

        return price;
      },
      cartProducts() {
        let items = [];
        let cartTotal = 0;
        this.cart.forEach(item => {
          let product = this.product(item.product);
          let productPrice = this.productTotal(product);
          productPrice = this.productWithExtras(productPrice, item.extras[0], item.extras[1], item.extras[2], item.extras[3], item.extras[4], item.extras[5]);
          let price = productPrice * item.quantity;
          cartTotal = cartTotal + price;

          items.push({
            "name": product.title,
            "description": this.extrasFromatter(item.extras),
            "quantity": item.quantity,
            "price": this.priceFormatter(productPrice),
            "currency": "USD"
          });
        });

        if (this.discount) {
          let totalDiscount = ((cartTotal / 100) * this.discounts[this.discount].discount);

          items.push({
            "name": 'Discount - ' + this.discounts[this.discount].title,
            "description": 'Code: ' + this.discounts[this.discount].code,
            "quantity": 1,
            "price": this.priceFormatter(totalDiscount * -1),
            "currency": "USD"
          });
        }

        return items;
      }
    },
    methods: {
        paymentAuthorized: function(event) {
          const self = this;
          this.loading = true;

          this.$store.commit('localStorage/completeOrder', [{
            title: this.personalTitle,
            firstName: this.personalFirstName,
            lastName: this.personalLastName,
            company: this.personalCompanyName,
            email: this.personalEmail,
            phone: this.personalPhone,
            address1: this.deliveryAddress1,
            address2: this.deliveryAddress2,
            address3: this.deliveryAddress3,
            city: this.deliveryCity,
            zipcode: this.deliveryZipCode,
            state: this.deliveryState
          }, event, this.cartProducts, this.priceFormatter(this.total), 'paid']);
        },
        paymentCancelled: function(event) {
          this.$buefy.toast.open({message: 'Your order was unsuccessful, please try again', type: 'is-danger'});
        },
        paymentComplete: function(event) {
          this.paymentAuthorized(event);
        },
        priceFormatter: function(price) {
            return (Math.floor(price * 100) / 100).toFixed(2)
        },
        extrasFromatter: function(extras) {
            return `
                Material: ${this.prices[extras[0]].title},
                Type: ${this.prices[extras[0]].finish ? this.prices[extras[0]].finish[extras[1]].title: this.prices[0].finish[extras[1]].title},
                Style: ${this.prices[extras[0]].styles ? this.prices[extras[0]].styles[extras[2]].title: this.prices[0].styles[extras[2]].title},
                Size: ${this.prices[extras[0]].size ? this.prices[extras[0]].size[extras[3]].title: this.prices[0].size[extras[3]].title},
                Frame: ${this.prices[extras[0]].frame ? this.prices[extras[0]].frame[extras[4]].title: this.prices[0].frame[extras[4]].title},
                Mount type: ${this.prices[extras[0]].mount ? this.prices[extras[0]].mount[extras[5]].title: this.prices[0].mount[extras[5]].title}
            `;
        },
        product(id) {
            const product = this.$store.state.products.filter(product => product.id === parseInt(id));
            return product[0];
        },
        productTotal(product) {
            let price = product.price;
            let discount = (price / 100) * product.discount;
            price = price - discount;

            return price;
        },
        productWithExtras(total, material, finish, styles, size, frame, mount) {
            let price = total;
            price = price + this.prices[material].price;

            if (this.prices[material].finish) {
              price = price + this.prices[material].finish[finish].price;
            }

            if (this.prices[material].styles) {
              price = price + this.prices[material].styles[styles].price;
            }

            if (this.prices[material].size) {
              price = price + this.prices[material].size[size].price;
            }

            if (this.prices[material].frame) {
              price = price + this.prices[material].frame[frame].price;
            }

            if (this.prices[material].mount) {
              price = price + this.prices[material].mount[mount].price;
            }

            return price;
        },
        validateDetails() {
            if (
                this.personalTitle !== '' &&
                this.personalFirstName !== '' &&
                this.personalLastName !== '' &&
                this.personalEmail !== '' &&
                this.personalPhone !== '' &&
                this.deliveryAddress1 !== '' &&
                this.deliveryCity !== '' &&
                this.deliveryZipCode !== '' &&
                this.deliveryState !== ''
            ) {
                this.checkoutValidation = true;

              if(window.innerWidth < 1024) {
                window.scroll({
                    top: document.querySelector('.checkout-panel--pay').getBoundingClientRect().top + window.scrollY,
                    left: 0,
                    behavior: 'smooth'
                });
              }
            } else {
              this.$buefy.toast.open({message: 'Please fill in all required fields before submitting the form!', type: 'is-danger'});
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    min-height: 60vh;
    flex-direction: column;

    h2 {
      margin-top: 20px;
    }

    p {
        margin-top: 20px;
    }
  }

  .checkout-panel {
      margin-top: 35px;
      padding-bottom: 20px;

      &--confirm {
        text-align: right;
      }

      &--pay {
          @media (min-width: $large) {
              width: 280px;
          }
      }

      .header {

          .icon {
              float: left;
              margin-right: 15px;
          }
      }
  }
</style>
