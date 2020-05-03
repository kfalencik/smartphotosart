<template>
  <div>
    <div>
      <div class="section">
        <div :class="{'product container': true, 'product--landscape': product.landscape}">

          <template v-if="overlay && image !== 0">
            <div class="product__overlay" @click="overlay = false">
              <img :src="require('@/assets/products/' + product.image)" v-if="image === 1" role="presentation" alt="" />
              <img :src="require('@/assets/products/' + product.canvasImage)" v-if="image === 2" role="presentation" alt="" />
              <img :src="require('@/assets/products/' + product.image2)" v-if="product.image2 && image === 3" role="presentation" alt="" />
              <img :src="require('@/assets/products/' + product.image3)" v-if="product.image3 && image === 4" role="presentation" alt="" />
              <img :src="require('@/assets/products/' + product.image4)" v-if="product.image4 && image === 5" role="presentation" alt="" />
              <img v-if="product.landscape && image === 6" :src="require('@/assets/images/comparison_landscape.jpg')" role="presentation" alt="" />
              <img v-if="!product.landscape && image === 6" :src="require('@/assets/images/comparison_portrait.jpg')" role="presentation" alt="" />

              <button @click="overlay = false" title="Close">
                <b-icon icon="close" custom-size="mdi-24px"></b-icon>
              </button>
            </div>
          </template>

          <template v-if="informationModal">
            <div class="product__information-overlay" @click="informationModal = false">
              <div class="product__information-overlay-wrapper" @click.stop.prevent="">
                <template v-if="informationType === 'material'">
                  <img :src="require('@/assets/images/info/' + prices[materialOption].image)" v-if="prices[materialOption].image" :alt="prices[materialOption].title + ' preview'" />
                  <button v-for="(option, index) in prices" :key="'material-' + index" :class="{'product__button': true, 'product__button--active': materialOption === index}" @click="changeMaterial(option.action, index)">{{option.title}}</button>
                  <h3>{{prices[materialOption].title}}</h3>
                  <div v-html="prices[materialOption].description"></div>

                  <template v-if="prices[materialOption].technical">
                    <br />
                    <p v-for="(item, index) in prices[materialOption].technical" :key="index">
                      <strong>{{ item.label }}</strong>: {{ item.value }}
                    </p>
                  </template>
                </template>

                <template v-if="informationType === 'finish'">
                  <img :src="require('@/assets/images/info/' + prices[materialOption][informationType][finishOption].image)" v-if="prices[materialOption][informationType][finishOption].image" :alt="prices[materialOption][informationType][finishOption].title + ' preview'" />
                  <button v-for="(option, index) in prices[materialOption].finish" :key="'finish-' + index" :class="{'product__button': true, 'product__button--active': finishOption === index}" @click="changeFinish(option.action, index)">{{option.title}}</button>
                  <h3>{{prices[materialOption][informationType][finishOption].title}}</h3>
                  <div v-html="prices[materialOption][informationType][finishOption].description"></div>

                  <template v-if="prices[materialOption][informationType][finishOption].technical">
                    <br />
                    <p v-for="(item, index) in prices[materialOption][informationType][finishOption].technical" :key="index">
                      <strong>{{ item.label }}</strong>: {{ item.value }}
                    </p>
                  </template>
                </template>

                <template v-if="informationType === 'styles'">
                  <img :src="require('@/assets/images/info/' + prices[materialOption].finish[finishOption][informationType][stylesOption].image)" v-if="prices[materialOption].finish[finishOption][informationType][stylesOption].image" :alt="prices[materialOption].finish[finishOption][informationType][stylesOption].title + ' preview'" />
                  <button v-for="(option, index) in prices[materialOption].finish[finishOption].styles" :key="'styles-' + index" :class="{'product__button': true, 'product__button--active': stylesOption === index}" @click="changeStyles(option.action, index)">{{option.title}}</button>
                  <h3>{{prices[materialOption].finish[finishOption][informationType][stylesOption].title}}</h3>
                  <div v-html="prices[materialOption].finish[finishOption][informationType][stylesOption].description"></div>

                  <template v-if="prices[materialOption].finish[finishOption][informationType][stylesOption].technical">
                    <br />
                    <p v-for="(item, index) in prices[materialOption].finish[finishOption][informationType][stylesOption].technical" :key="index">
                      <strong>{{ item.label }}</strong>: {{ item.value }}
                    </p>
                  </template>
                </template>

                <template v-if="informationType === 'frame'">
                  <img :src="require('@/assets/images/info/' + prices[materialOption][informationType][frameOption].image)" v-if="prices[materialOption][informationType][frameOption].image" :alt="prices[materialOption][informationType][frameOption].title + ' preview'" />
                  <button v-for="(option, index) in prices[materialOption].frame" :key="'frame-' + index" :class="{'product__button': true, 'product__button--active': frameOption === index}" @click="changeFrame(option.action, index)">{{option.title}}</button>
                  <h3>{{prices[materialOption][informationType][frameOption].title}}</h3>
                  <div v-html="prices[materialOption][informationType][frameOption].description"></div>

                  <template v-if="prices[materialOption][informationType][frameOption].technical">
                    <br />
                    <p v-for="(item, index) in prices[materialOption][informationType][frameOption].technical" :key="index">
                      <strong>{{ item.label }}</strong>: {{ item.value }}
                    </p>
                  </template>
                </template>

                <template v-if="informationType === 'glass'">
                  <img :src="require('@/assets/images/info/' + prices[materialOption][informationType][glassOption].image)" v-if="prices[materialOption][informationType][glassOption].image" :alt="prices[materialOption][informationType][glassOption].title + ' preview'" />
                  <button v-for="(option, index) in prices[materialOption].glass" :key="'glass-' + index" :class="{'product__button': true, 'product__button--active': glassOption === index}" @click="changeGlass(option.action, index)">{{option.title}}</button>
                  <h3>{{prices[materialOption][informationType][glassOption].title}}</h3>
                  <div v-html="prices[materialOption][informationType][glassOption].description"></div>

                  <template v-if="prices[materialOption][informationType][glassOption].technical">
                    <br />
                    <p v-for="(item, index) in prices[materialOption][informationType][glassOption].technical" :key="index">
                      <strong>{{ item.label }}</strong>: {{ item.value }}
                    </p>
                  </template>
                </template>

                <template v-if="informationType === 'backing'">
                  <img :src="require('@/assets/images/info/' + prices[materialOption].finish[finishOption][informationType][backingOption].image)" v-if="prices[materialOption].finish[finishOption][informationType][backingOption].image" :alt="prices[materialOption].finish[finishOption][informationType][backingOption].title + ' preview'" />
                  <button v-for="(option, index) in prices[materialOption].finish[finishOption].backing" :key="'backing-' + index" :class="{'product__button': true, 'product__button--active': backingOption === index}" @click="changeBacking(option.action, index)">{{option.title}}</button>
                  <h3>{{prices[materialOption].finish[finishOption][informationType][backingOption].title}}</h3>
                  <div v-html="prices[materialOption].finish[finishOption][informationType][backingOption].description"></div>

                  <template v-if="prices[materialOption].finish[finishOption][informationType][backingOption].technical">
                    <br />
                    <p v-for="(item, index) in prices[materialOption].finish[finishOption][informationType][backingOption].technical" :key="index">
                      <strong>{{ item.label }}</strong>: {{ item.value }}
                    </p>
                  </template>
                </template>

                <button @click="informationModal = false" class="close" title="Close">
                  <b-icon icon="close" custom-size="mdi-24px"></b-icon>
                </button>
              </div>   
            </div>
          </template>

          <div class="columns is-4">
            <div class="column is-two-thirds">
              <div class="product__title">
                <h2>{{product.title}}</h2>
                <Stars :product="product.id" link="true" />
                <p>All of our prints are high-resolution images, printed with acid-free ink on best quality canvas. Please use the widget below to customize canvas size, edge colour, frame and more.</p>
              </div>
            </div>
          </div>

          <div class="columns is-4">
            <div class="column is-two-thirds">
              <template v-if="image === 0">
                <div v-if="product.canvasImage" class="product__dynamic-preview" :style="{ 'background-image': 'url(' + require('@/assets/images/product-' + orientation + '-background-' + canvasImage + '.jpg') + ')' }" >
                  <div class="product__canvas" :style="{ 'background-image': 'url(' + require('@/assets/products/' + product.canvasImage) + ')', 'transform': 'scale(' + size * zoom + ')', width: product.landscape ? '480px' : '310px',   height: product.landscape ? '310px' : '480px' }">
                    <div class="product__frame" v-if="frame !== 'transparent'" :style="{'border-color': frame}"></div>
                  </div>

                  <button @click="canvasImage === 1 ? canvasImage = 5 : canvasImage = canvasImage - 1" class="product__nav-item" title="Previous">
                    <b-icon icon="arrow-left" custom-size="mdi-24px"></b-icon>
                  </button>
                  <button @click="canvasImage === 5 ? canvasImage = 1 : canvasImage = canvasImage + 1" class="product__nav-item" title="Next">
                    <b-icon icon="arrow-right" custom-size="mdi-24px"></b-icon>
                  </button>
                </div>
              </template>

              <template v-else>
                <div class="product__image">
                  <img :src="require('@/assets/products/' + product.image)" v-if="image === 1" role="presentation" alt="" />
                  <img :src="require('@/assets/products/' + product.canvasImage)" v-if="image === 2" role="presentation" alt="" />
                  <img :src="require('@/assets/products/' + product.image2)" v-if="product.image2 && image === 3" role="presentation" alt="" />
                  <img :src="require('@/assets/products/' + product.image3)" v-if="product.image3 && image === 4" role="presentation" alt="" />
                  <img :src="require('@/assets/products/' + product.image4)" v-if="product.image4 && image === 5" role="presentation" alt="" />
                  <img v-if="product.landscape && image === 6" :src="require('@/assets/images/comparison_landscape.jpg')" role="presentation" alt="" />
                  <img v-if="!product.landscape && image === 6" :src="require('@/assets/images/comparison_portrait.jpg')" role="presentation" alt="" />

                  <template v-if="image !== 0">
                    <button @click="overlay = true" class="product__image-fullscreen" title="Full screen">
                      <b-icon icon="fullscreen" custom-size="mdi-24px"></b-icon>
                    </button>
                  </template>
                </div>
              </template>

              <p class="small">Please note the preview above is just for demonstration purpouses. The actual size and colours might be slightly different.</p>

              <div class="product__thumbnails">
                <div class="product__thumbnails-item product__thumbnails-item--preview" :class="{'product__thumbnails-item--active': image === 0}" aria-label="Dynamic preview" @click="image = 0;">
                  <b-icon icon="image-filter"></b-icon>
                  Dynamic preview
                </div>
                <div class="product__thumbnails-item" @click="image = 1;" :class="{'product__thumbnails-item--active': image === 1}">
                  <img :src="require('@/assets/products/' + product.image)" alt="Thumbnail 2" />
                </div>

                <div class="product__thumbnails-item" @click="image = 2;" :class="{'product__thumbnails-item--active': image === 2}">
                  <img :src="require('@/assets/products/' + product.canvasImage)" alt="Thumbnail 3" />
                </div>

                <div v-if="product.image2" class="product__thumbnails-item" @click="image = 3;" :class="{'product__thumbnails-item--active': image === 3}">
                  <img :src="require('@/assets/products/' + product.image2)" alt="Thumbnail 4" />
                </div>

                <div v-if="product.image3" class="product__thumbnails-item" @click="image = 4;" :class="{'product__thumbnails-item--active': image === 4}">
                  <img :src="require('@/assets/products/' + product.image2)" alt="Thumbnail 4" />
                </div>

                <div v-if="product.image4" class="product__thumbnails-item" @click="image = 5;" :class="{'product__thumbnails-item--active': image === 5}">
                  <img :src="require('@/assets/products/' + product.image2)" alt="Thumbnail 4" />
                </div>

                <div class="product__thumbnails-item" @click="image = 6;" :class="{'product__thumbnails-item--active': image === 6}">
                  <img v-if="product.landscape" :src="require('@/assets/images/comparison_landscape.jpg')" role="presentation" alt="Size comparison" />
                  <img v-else :src="require('@/assets/images/comparison_portrait.jpg')" alt="Size comparison" />
                </div>
              </div>
            </div>


            <div class="product__details column is-one-third">
              <div class="product__options">

                <div class="product__option">
                  <h5 @click="information('material')">Material <b-icon icon="information-outline" custom-size="mdi-18" /></h5>
                  <div class="wrap">
                    <button v-for="(option, index) in prices" :key="'material-' + index" :class="{'product__button': true, 'product__button--active': materialOption === index}" @click="changeMaterial(option.action, index)">{{option.title}}</button>
                  </div>
                </div>

                <div class="product__option" v-if="prices[materialOption].finish">
                  <h5 @click="information('finish')">Media <b-icon icon="information-outline" custom-size="mdi-18" /></h5>
                  <div class="wrap">
                    <button v-for="(option, index) in prices[materialOption].finish" :key="'finish-' + index" :class="{'product__button': true, 'product__button--active': finishOption === index}" @click="changeFinish(option.action, index)">{{option.title}}</button>
                  </div>
                </div>

                <div class="product__option" v-if="prices[materialOption].finish[finishOption].styles">
                  <h5 @click="information('styles')">Style <b-icon icon="information-outline" custom-size="mdi-18" /></h5>
                  <div class="wrap">
                    <button v-for="(option, index) in prices[materialOption].finish[finishOption].styles" :key="'styles-' + index" :class="{'product__button': true, 'product__button--active': stylesOption === index}" @click="changeStyles(option.action, index)">{{option.title}}</button>
                  </div>
                </div>

                <div class="product__option" v-if="prices[materialOption].finish[finishOption].backing">
                  <h5 @click="information('backing')">Backing <b-icon icon="information-outline" custom-size="mdi-18" /></h5>
                  <div class="wrap">
                    <button v-for="(option, index) in prices[materialOption].finish[finishOption].backing" :key="'backing-' + index" :class="{'product__button': true, 'product__button--active': backingOption === index}" @click="changeBacking(option.action, index)">{{option.title}}</button>
                  </div>
                </div>

                <div class="product__option">
                  <h5>Size</h5>
                  <div class="wrap">
                    <button v-for="(option, index) in prices[materialOption].finish[finishOption].size" :key="'size-' + index" :class="{'product__button': true, 'product__button--active': sizeOption === index}" @click="changeSize(option.action, index)">{{option.title}}</button>
                  </div>
                </div>

                <div class="product__option" v-if="prices[materialOption].frame">
                  <h5 @click="information('frame')">Frame <b-icon icon="information-outline" custom-size="mdi-18" /></h5>
                  <div class="wrap">
                    <button v-for="(option, index) in prices[materialOption].frame" :key="'frame-' + index" :class="{'product__button': true, 'product__button--active': frameOption === index}" @click="changeFrame(option.action, index)">{{option.title}}</button>
                  </div>
                </div>

                <div class="product__option" v-if="prices[materialOption].glass">
                  <h5 @click="information('glass')">Glass <b-icon icon="information-outline" custom-size="mdi-18" /></h5>
                  <div class="wrap">
                    <button v-for="(option, index) in prices[materialOption].glass" :key="'glass-' + index" :class="{'product__button': true, 'product__button--active': glassOption === index}" @click="changeGlass(option.action, index)">{{option.title}}</button>
                  </div>
                </div>

                <div class="product__option">
                  <h5>Quantity</h5>
                  <div class="wrap product__quantity">
                    <button class="button button--tertiary" @click="changeQuantity(quantity - 1)"><b-icon icon="minus-circle-outline" /><span class="sr-only">Minus</span></button>
                    <span>{{ quantity }}</span>
                    <button class="button button--tertiary" @click="changeQuantity(quantity + 1)"><b-icon icon="plus-circle-outline" /><span class="sr-only">Plus</span></button>
                  </div>
                </div>
              </div>

              <div class="product__add-to-cart">
                <div class="product__price">
                  <h5>{{ price(total) }}</h5>
                </div>

                <div class="product__add">
                  <button class="button is-success" @click="addToCart">Add to cart</button>
                </div>
              </div>

              <div class="details">
                <label for="details"><b-icon icon="information-outline"/> Price details</label>
                <input id="details" type="checkbox" class="toggler" />

                <div class="toggler-content">
                  <h5>Product</h5>
                  <table border="1">
                    <tbody>
                    <tr><td>Print price</td><td>{{ price(product.price)}}</td></tr>
                    <tr><td>Discount</td><td>{{product.discount}}%</td></tr>
                    <tr><td><strong>Total</strong></td><td><strong>{{ price(productTotal)}}</strong></td></tr>
                    </tbody>
                  </table>

                  <h5>Extras</h5>
                  <table border="1">
                    <tbody>
                    <tr><td>Material</td><td>{{prices[materialOption].title}}</td><td>{{ price(prices[materialOption].price)}}</td></tr>
                    <tr v-if="prices[materialOption].finish"><td>Media</td><td>{{prices[materialOption].finish[finishOption].title}}</td><td>{{ price(prices[materialOption].finish[finishOption].price)}}</td></tr>
                    <tr v-if="prices[materialOption].finish[finishOption].styles"><td>Style</td><td>{{prices[materialOption].finish[finishOption].styles[stylesOption].title}}</td><td>{{ price(prices[materialOption].finish[finishOption].styles[stylesOption].price)}}</td></tr>
                    <tr v-if="prices[materialOption].finish[finishOption].backing"><td>Backing</td><td>{{prices[materialOption].finish[finishOption].backing[backingOption].title}}</td><td>{{ price(prices[materialOption].finish[finishOption].backing[backingOption].price)}}</td></tr>
                    <tr><td>Size</td><td>{{prices[materialOption].finish[finishOption].size[sizeOption].title}}</td><td>{{ price(prices[materialOption].finish[finishOption].size[sizeOption].price)}}</td></tr>
                    <tr v-if="prices[materialOption].frame"><td>Frame</td><td>{{prices[materialOption].frame[frameOption].title}}</td><td>{{ price(prices[materialOption].frame[frameOption].price)}}</td></tr>
                    <tr v-if="prices[materialOption].glass"><td>Glass</td><td>{{prices[materialOption].glass[glassOption].title}}</td><td>{{ price(prices[materialOption].glass[glassOption].price)}}</td></tr>
                    <tr><td><strong>Extras total</strong></td><td></td><td><strong>{{ price(extrasTotal) }}</strong></td></tr>
                    </tbody>
                  </table>

                  <h5>Totals</h5>
                  <table border="1">
                    <tbody>
                    <tr><td>Product</td><td>{{ price(productTotal)}}</td></tr>
                    <tr><td>Extras</td><td>{{ price(extrasTotal) }}</td></tr>
                    <tr><td>Product with extras</td><td>{{ price(productWithExtras) }}</td></tr>
                    <tr><td>Quantity</td><td>x{{quantity}}</td></tr>
                    <tr><td><strong>Total</strong></td><td><strong>{{ price(total) }}</strong></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <KeyPoints style="key-points" />
  </div>
</template>

<script>
import Stars from '~/components/Stars';
import KeyPoints from '~/components/KeyPoints';

export default {
  head () {
    return {
      title: 'Smart Photos Art - ' + this.product.title,
      meta: [
        { hid: 'ogtitle', property: 'og:title', content: 'Smart Photos Art - ' + this.product.title},
        { hid: 'ogdesc', property: 'og:description', content: 'A beautiful canvas "' + this.product.title + '" for your wall'},
        { hid: 'ogtype', property: 'og:type', content: 'product.item'},
        { hid: 'ogurl', property: 'og:url', content: 'https://www.smartphotosart.com/shop/' + this.$route.params.slug},
        { hid: 'ogimage', property: 'og:image', content: require('@/assets/products/' + this.product.canvasImage)},
        { property: 'product:price:amount', content: this.priceFormatter(this.productTotal)},
        { property: 'product:price:currency', content: 'USD'},
        { property: 'product:retailer_item_id', content: this.product.id},
        { hid: 'twittercard', name: 'twitter:card', content: 'summary_large_image'},
        { hid: 'twittertitle', name: 'twitter:title', content: 'Smart Photos Art - ' + this.product.title},
        { hid: 'twitterdesc', name: 'twitter:description', content: 'A beautiful canvas "' + this.product.title + '" for your wall'},
        { hid: 'twitterimage', name: 'twitter:image', content: require('@/assets/products/' + this.product.canvasImage)},
      ],
      link: [
        { rel: 'canonical', href: 'https://www.smartphotosart.com/shop/' + this.$route.params.slug}
      ]
    }
  },
  jsonld() {
    return {
      "@context": "https://www.schema.org",
      "@type": "product",
      "brand": "Smart Photos Art",
      "logo": "https://d33wubrfki0l68.cloudfront.net/c65ae7c78c877a2b79ca8c12efc08fbfdf7e6409/32cd5/_nuxt/img/7aadeb4.png",
      "name": this.product.title,
      "category": this.product.category,
      "image": require('@/assets/products/' + this.product.canvasImage),
      "description": 'A beautiful canvas "' + this.product.title + '" for your wall',
      "productID": this.product.id,
      "aggregateRating": {
        "@type": "aggregateRating",
        "ratingValue": this.productRating,
        "reviewCount": this.productReviews.length
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": this.priceFormatter(this.productTotal),
        "availability": "http://schema.org/InStock"
      }
    }
  },
  transition: 'page',
  data() {
    return {
      quantity: 1,
      size: 0.2 ,
      material: 0,
      materialOption: 0,
      finish: 0,
      finishOption: 0,
      styles: 0,
      stylesOption: 0,
      sizeOption: 0,
      glass: 0,
      glassOption: 0,
      backing: 0,
      backingOption: 0,
      frame: 'transparent',
      frameOption: 0,
      zoom: 1,
      image: 0,
      canvasImage: 1,
      overlay: false,
      informationModal: false,
      informationType: 'material'
    }
  },
  components: {
    Stars,
    KeyPoints
  },
  computed: {
    orientation() {
      if (this.product.landscape) {
        return 'landscape';
      } else {
        return 'horizontal';
      }
    },
    slug() {
      return this.$route.params.slug;
    },
    product() {
      const product = this.$store.state.products.filter(product => product.slug === this.slug);
      return product[0];
    },
    productReviews() {
      const reviews = this.$store.state.reviews.filter(product => product.id === this.product.id);
      return reviews;
    },
    productRating() {
      let stars = 0;
      let reviewsTotal = this.productReviews.length;
      this.productReviews.forEach(review => {
        stars = stars + review.stars;
      });

      return Math.ceil(stars / reviewsTotal);
    },
    background() {
      return 'url(' + require('@/assets/products/' + this.product.canvasImage) + ')';
    },
    prices() {
      return this.$store.state.prices;
    },
    productTotal() {
      let price = this.product.price;
      let discount = (price / 100) * this.product.discount;
      price = price - discount;

      return price;
    },
    productWithExtras() {
      let price = this.productTotal;
      price = price + this.prices[this.materialOption].price;

      if (this.prices[this.materialOption].finish[this.finishOption].size) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].size[this.sizeOption].price;
      }

      if (this.prices[this.materialOption].finish) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].price;
      }

      if (this.prices[this.materialOption].finish[this.finishOption].styles) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].styles[this.stylesOption].price;
      }

      if (this.prices[this.materialOption].finish[this.finishOption].backing) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].backing[this.backingOption].price;
      }

      if (this.prices[this.materialOption].glass) {
        price = price + this.prices[this.materialOption].glass[this.glassOption].price;
      }

      if (this.prices[this.materialOption].frame) {
        price = price + this.prices[this.materialOption].frame[this.frameOption].price;
      }

      return price;
    },
    extrasTotal() {
      let price = this.prices[this.materialOption].price;

      if (this.prices[this.materialOption].finish[this.finishOption].size) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].size[this.sizeOption].price;
      }

      if (this.prices[this.materialOption].finish) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].price;
      }

      if (this.prices[this.materialOption].finish[this.finishOption].styles) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].styles[this.stylesOption].price;
      }

      if (this.prices[this.materialOption].finish[this.finishOption].backing) {
        price = price + this.prices[this.materialOption].finish[this.finishOption].backing[this.backingOption].price;
      }

      if (this.prices[this.materialOption].glass) {
        price = price + this.prices[this.materialOption].glass[this.glassOption].price;
      }

      if (this.prices[this.materialOption].frame) {
        price = price + this.prices[this.materialOption].frame[this.frameOption].price;
      }

      return price;
    },
    total() {
      return this.productWithExtras * this.quantity;
    },
    zoomLevel() {
      return 2;
    }
  },
  mounted() {
    this.size = this.prices[0].finish[0].size[this.prices[0].finish[0].size.length - 1].action;
    this.sizeOption = this.prices[0].finish[0].size.length - 1;
  },
  methods: {
    discount: function(price, discount) {
      return price - ((price / 100) * discount);
    },
    magnify(zoom) {
      this.zoom = zoom;
    },
    information(modal) {
      this.informationModal = true;
      this.informationType = modal;
    },
    changeSize: function(size, sizeOption) {
      this.size = size;
      this.sizeOption = sizeOption;
    },
    changeMaterial: function(material, index) {
      this.material = material;
      this.materialOption = index;
      this.size = this.prices[index].finish[0].size[this.prices[index].finish[0].size.length - 1].action;
      this.sizeOption = this.prices[index].finish[0].size.length - 1;
      this.finish = 0;
      this.finishOption = 0;
      this.styles = 0;
      this.stylesOption = 0;
      this.glass = 0;
      this.glassOption = 0;
      this.frame = 'transparent';
      this.frameOption = 0;
      this.backing = 0;
      this.backingOption = 0;
    },
    changeFinish: function(finish, index) {
      this.finish = finish;
      this.finishOption = index;
      this.size = this.prices[this.materialOption].finish[index].size[this.prices[this.materialOption].finish[index].size.length - 1].action;
      this.sizeOption = this.prices[this.materialOption].finish[index].size.length - 1;
    },
    changeStyles: function(styles, index) {
      this.styles = styles;
      this.stylesOption = index;
    },
    changeGlass: function(glass, index) {
      this.glass = glass;
      this.glassOption = index;
    },
    changeFrame: function(frame, index) {
      this.frame = frame;
      this.frameOption = index;
    },
    changeBacking: function(backing, index) {
      this.backing = backing;
      this.backingOption = index;
    },
    changeQuantity: function(quantity) {
      if (quantity !== 0 && quantity !== 10) {
        this.quantity = quantity;
      }
    },
    price: function(price) {
      return '$' + (Math.floor(price * 100) / 100).toFixed(2)
    },
    priceFormatter: function(price) {
      return (Math.floor(price * 100) / 100).toFixed(2)
    },
    addToCart: function() {
      const self = this;

      this.$store.commit('localStorage/addToCart', [this.product.id, [this.materialOption, this.finishOption, this.stylesOption, this.sizeOption, this.frameOption, this.glassOption, this.backingOption], this.quantity]);
      this.$buefy.snackbar.open({
        duration: 5000,
        position: 'is-top',
        message: 'Item has been added to your cart!',
        type: 'is-success',
        actionText: 'Go to cart',
        onAction: () => {
          self.$router.push('/shop/cart');
        }
      });

      this.material = 0;
      this.materialOption = 0;
      this.size = this.prices[0].finish[0].size[this.prices[0].finish[0].size.length - 1].action;
      this.sizeOption = this.prices[0].finish[0].size.length - 1;
      this.finish = 0;
      this.finishOption = 0;
      this.styles = 0;
      this.stylesOption = 0;
      this.glass = 0;
      this.glassOption = 0;
      this.quantity = 1;
      this.backing = 0;
      this.backingOption = 0;
    }
  }
}
</script>

<style lang="scss" scoped>

  .key-points {
    margin: -25px 0 -50px 0;

    @media (min-width: $medium) {
      margin: -50px 0;
    }
  }

  .product {
    $canvasWidth: 300px;
    $canvasHeight: 480px;
    $canvasDepth: 6px;
    margin-bottom: 50px;

    h2 {
      margin-top: 0;
      margin-bottom: 15px;
    }

    $root: &;

    &__title {
      border-bottom: 1px solid lighten($lightgrey, 40%);
      padding-bottom: 15px;

      p {
        margin-top: 10px;
      }
    }

    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      background: rgba(0,0,0,.8);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-height: 80vh;
        max-width: 96%;
      }

      button {
        background: $black;
        color: $white;
        position: absolute;
        top: 50px;
        right: 50px;
        border: none;
        width: 40px;
        height: 40px;
        z-index: 30;
        transition: all .5s ease;
        cursor: pointer;
        display: block;
        transform: translateY(-50%);

        &:hover {
          background: $tertiary;
          color: $white;
        }
      }
    }

    &__information-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      background: rgba(0,0,0,.8);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin-top: 25px;
      }

      @media (min-width: $medium) {
        img {
          width: 50%;
          border: 1px solid $primary;
          float: left;
          margin-right: 35px;
          margin-top: 0;
        }
      }

      h3 {
        margin: 35px 0 10px;
      }

      .close {
        background: $black;
        color: $white;
        position: absolute;
        top: 30px;
        right: 10px;
        border: none;
        width: 40px;
        height: 40px;
        z-index: 30;
        transition: all .5s ease;
        cursor: pointer;
        display: block;
        transform: translateY(-50%);

        &:hover {
          background: $tertiary;
          color: $white;
        }
      }
    }

    &__information-overlay-wrapper {
      background: $white;
      width: 96%;
      max-width: 1024px;
      min-height: 250px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 20px;
      position: relative;

      /deep/ p {
        margin: 15px 0;
      }
    }

    &__nav-item {
      background: $black;
      color: $white;
      position: absolute;
      top: 50%;
      left: 20px;
      border: none;
      width: 40px;
      height: 40px;
      z-index: 30;
      transition: opacity .5s ease, background .5s ease, color .5s ease;
      cursor: pointer;
      opacity: 0.3;
      display: block;
      transform: translateY(-50%);
      border: 1px solid $primary;

      &:nth-child(3) {
        left: auto;
        right: 20px;
      }

      &:hover {
        background: $tertiary;
        color: $white;
      }
    }

    &__options {
      padding: 0 0 15px;
      border-bottom: 1px solid lighten($lightgrey, 40%);
      margin-bottom: 15px;
    }

    &__option {
      margin-bottom: 25px;

      &:last-child {
        margin-bottom: 0;
      }

      h5 {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .details {
      padding-bottom: 20px;
      text-align: right;

      label {
        font-size: 0.8em;
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 10px;
      }

      .toggler-content {
        text-align: left;
      }

      .icon {
        vertical-align: sub;
      }

      table {
        width: 100%;
        margin-bottom: 25px;

        td {
          padding: 10px;
          font-size: 0.6em;

          strong {
            font-size: 1em;
          }
        }
      }
    }

    &__price {
      font-size: 1.2em;

      .discount {
        font-size: 0.6em;
        color: $lightgrey;
        text-decoration: line-through;
      }
    }

    &__add-to-cart {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 50px;
    }

    &__quantity {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 15px;

      span {
        padding: 0 20px;
      }
    }

    &__button {
      border: 2px solid $white;
      transition: all .3s ease;
      background: $white;
      padding: 6px 8px;
      font-size: 0.8em;
      margin: 5px 10px 5px 0;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
      width: calc(50% - 5px);
      cursor: pointer;

      &:nth-child(even) {
        margin-right: 0;
      }

      @media (min-width: $medium) {
        width: auto;

        &:nth-child(even) {
          margin-right: 10px;
        }
      }

      @media (min-width: $large) {
        margin-bottom: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &--active, &:hover, &--disabled {
        border-color: #000;
        background: #000;
        color: $white;
      }
    }

    &__image {
      text-align: center;
      border: 2px solid lighten($lightgrey, 40%);
      height: 300px;
      overflow: hidden;
      position: relative;

      @media (min-width: $large) {
        height: 585px;
      }

      img {
        height: 100%;
        object-fit: contain;
        display: block;
        margin: 0 auto;
      }

      &:hover {
        .product__image-fullscreen {
          opacity: 1;
        }
      }
    }

    &__image-fullscreen {
      position: absolute;
      z-index: 20;
      top: 20px;
      right: 20px;
      background: $black;
      color: $white;
      border: none;
      width: 40px;
      height: 40px;
      z-index: 30;
      transition: all .5s ease;
      cursor: pointer;
      opacity: 0.3;
      display: block;
      border: 1px solid $primary;
      
      &:hover {
        background: $tertiary;
        color: $white;
      }
    }

    &__dynamic-preview {
      border: 2px solid lighten($lightgrey, 40%);
      background-size: cover;
      background-position: center;
      padding-top: 15px;
      margin-bottom: -280px;
      transform-origin: left top;
      transform: scale(0.5);
      width: 200%;
      height: 585px;
      transition: all 0.3s ease;

      @media (min-width: $large) {
        transform: scale(1);
        width: 100%;
        margin-bottom: 0;
        background-position: center top;
      }

      &:hover .product__nav-item {
        opacity: 1;
      }
    }

    .small {
      color: $lightgrey;
      font-size: 0.6em;
    }

    &__canvas {
      margin: -($canvasDepth/2) auto auto;
      position: relative;
      width: $canvasWidth;
      height: $canvasHeight;
      box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.45);
      background-size: 101%;
      transform-origin: center;
      transition: all .3s ease;
      background-size: cover;
      background-position: center;
    }

    &__canvas-top {
      transform: scaleY(-1) skew(45deg, 0);
      transform-origin: 0% 50%;
      margin-left: $canvasDepth/2;
      top: -$canvasDepth;
      background-image: inherit;
      background-size: cover !important;
      background-position: top right;
      position: absolute;
      width: 100%;
      height: $canvasDepth;
      border-top: 1px solid lighten($lightgrey, 40%);
      border-right: 1px solid $lightgrey;

      &::after {
        display: block;
        content: "";
        position: absolute;
        width: inherit;
        height: inherit;
        background: rgba(#000, 0.25);
      }
    }

    &__canvas-right {
      transform: scaleX(-1) skew(0, 45deg);
      position: absolute;
      transform-origin: 0% 50%;
      margin-left: $canvasDepth;
      margin-top: -$canvasDepth;
      left: 100%;
      background-image: inherit;
      background-size: cover !important;
      background-position: top right;
      width: $canvasDepth;
      height: 100%;
      border-right: 1px solid lighten($lightgrey, 40%);

      &::after {
        display: block;
        content: "";
        position: absolute;
        width: $canvasDepth;
        height: $canvasHeight;
        background: rgba(#000, 0.38);
      }
    }

    &__frame {
      overflow: hidden;
      height: 100%;
      width: 100%;
      border: 10px solid #000;
      position: relative;

      &::after {
        content: '';
        display: block;
        border: 1px solid $primary;
        box-shadow: inset 3px 3px 6px -4px rgba(0, 0, 0, 0.5);
        padding: 10px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }

    &--landscape {

      #{$root}__canvas {
        width: $canvasHeight;
        height: $canvasWidth;
      }

      #{$root}__canvas-right {
        &::after {
          height: $canvasWidth;
        }
      }
    }

    &__thumbnails {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    &__thumbnails-item {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      border: 2px solid lighten($lightgrey, 40%);
      color: $secondary;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      font-size: 0.8em;
      cursor: pointer;
      transition: all .5s ease;

      &:last-child {
        margin-right: 0;
      }

      &--active, &:hover {
        border-color: $tertiary;
      }

      img {
        height: 100%;
        width: 100%;
        display: block;
        object-fit: cover;
      }
    }
  }
</style>
