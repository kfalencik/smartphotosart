<template>
  <div>
    <div>
      <div class="section">
        <div :class="{'product container': true, 'product--landscape': product.landscape}">
          <div class="columns is-4">
            <div class="column is-half">
              <template v-if="image === 0">
                <div v-if="product.canvasImage" class="product__dynamic-preview" :style="{ 'background-image': 'url(' + require('@/assets/images/product-background-' + canvasImage + '.jpg') + ')' }" @click="canvasImage === 3 ? canvasImage = 1 : canvasImage = canvasImage + 1" >
                  <div class="product__canvas" :style="{ 'background-image': 'url(' + require('@/assets/products/' + product.canvasImage) + ')', 'transform': 'scale(' + size * zoom + ')' }" @mouseover="magnify(zoomLevel)" @mouseleave="magnify(1)">
                    <div class="product__canvas-top" :style="{'height': thickness + 'px', 'top': thickness * -1 + 'px', 'margin-left': thickness/2 + 'px', 'background': edge}"></div>
                    <div class="product__canvas-right" :style="{'width': thickness + 'px', 'margin-top': thickness * -1 + 'px', 'margin-left': thickness + 'px', 'background': edge}"></div>
                    <div class="product__frame" v-if="frame !== 'transparent'" :style="{'border-color': frame}"></div>
                    <div class="product__canvas-top product__frame-top" :style="{'height': thickness + 'px', 'top': thickness * -1 + 'px', 'margin-left': thickness/2 + 'px', 'background': frame}"></div>
                    <div class="product__canvas-right product__frame-right" :style="{'width': thickness + 'px', 'top': -1 + 'px', 'margin-left': thickness + 'px', 'background': frame}"></div>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="product__image">
                  <img :src="require('@/assets/products/' + product.image)" v-if="image === 1" role="presentation" alt="" />
                  <img :src="require('@/assets/products/' + product.canvasImage)" v-if="image === 2" role="presentation" alt="" />
                  <img :src="require('@/assets/products/' + product.image2)" v-if="product.image2 && image === 3" role="presentation" alt="" />
                  <img :src="require('@/assets/products/' + product.image3)" v-if="product.image3 && image === 4" role="presentation" alt="" />
                  <img :src="require('@/assets/products/' + product.image4)" v-if="product.image4 && image === 5" role="presentation" alt="" />
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
              </div>
            </div>


            <div class="product__details column is-half">
              <div class="product__title">
                <h2>{{product.title}}</h2>
                <Stars :product="product.id" link="true" />
                <p>All of our prints are high-resolution images, printed with acid-free ink on best quality canvas. Please use the widget below to customize canvas size, edge colour, frame and more.</p>
              </div>

              <div class="product__options">
                <div class="product__option">
                  <h5>Canvas size</h5>
                  <div class="wrap">
                    <button v-for="(option, index) in prices" :key="'size-' + index" :class="{'product__button': true, 'product__button--active': sizeOption === index}" @click="changeSize(option.action, index)">{{option.title}}</button>
                  </div>
                </div>

                <div class="product__option">
                  <h5>Canvas thickness</h5>
                  <div class="wrap" v-if="prices[sizeOption].thickness">
                    <button v-for="(option, index) in prices[sizeOption].thickness" :key="'thickenss-' + index" :class="{'product__button': true, 'product__button--active': thicknessOption === index}" @click="changeThickness(option.action, index)">{{option.title}}</button>
                  </div>
                  <div v-else>
                    <button class="product__button product__button--disabled" disabled>{{prices[0].thickness[0].title}}</button>
                  </div>
                </div>

                <div class="product__option">
                  <h5>Canvas edge</h5>
                  <div class="wrap" v-if="prices[sizeOption].edge">
                    <button v-for="(option, index) in prices[sizeOption].edge" :key="'thickenss-' + index" :class="{'product__button': true, 'product__button--active': edgeOption === index}" @click="changeEdge(option.action, index)">{{option.title}}</button>
                  </div>
                  <div v-else>
                    <button class="product__button product__button--disabled" disabled>{{prices[0].edge[0].title}}</button>
                  </div>
                </div>

                <div class="product__option">
                  <h5>Frame</h5>
                  <div class="wrap" v-if="prices[sizeOption].frame">
                    <button v-for="(option, index) in prices[sizeOption].frame" :key="'frame-' + index" :class="{'product__button': true, 'product__button--active': frameOption === index}" @click="changeFrame(option.action, index)">{{option.title}}</button>
                  </div>
                  <div v-else>
                    <button class="product__button product__button--disabled" disabled>{{prices[0].frame[0].title}}</button>
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
                    <tr><td>Canvas size</td><td>{{prices[sizeOption].title}}</td><td>{{ price(prices[sizeOption].price)}}</td></tr>
                    <tr v-if="prices[sizeOption].thickness"><td>Canvas thickness</td><td>{{prices[sizeOption].thickness[thicknessOption].title}}</td><td>{{ price(prices[sizeOption].thickness[thicknessOption].price)}}</td></tr>
                    <tr v-else><td>Canvas thickness</td><td>{{prices[0].thickness[0].title}}</td><td>{{ price(prices[0].thickness[0].price)}}</td></tr>

                    <tr v-if="prices[sizeOption].edge"><td>Canvas edge</td><td>{{prices[sizeOption].edge[edgeOption].title}}</td><td>{{ price(prices[sizeOption].edge[edgeOption].price)}}</td></tr>
                    <tr v-else><td>Canvas edge</td><td>{{prices[0].edge[0].title}}</td><td>{{ price(prices[0].edge[0].price)}}</td></tr>

                    <tr v-if="prices[sizeOption].frame"><td>Frame</td><td>{{prices[sizeOption].frame[frameOption].title}}</td><td>{{ price(prices[sizeOption].frame[frameOption].price)}}</td></tr>
                    <tr v-else><td>Frame</td><td>{{prices[0].frame[0].title}}</td><td>{{ price(prices[0].frame[0].price) }}</td></tr>

                    <tr><td><strong>Extras total</strong></td><td></td><td><strong>{{ price(extrasTotal) }}</strong></td></tr>
                    </tbody>
                  </table>

                  <h5>Totals</h5>
                  <table border="1">
                    <tbody>
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
        { hid: 'ogurl', property: 'og:url', content: 'https://www.smartgraphicsart.com/shop/' + this.$route.params.slug},
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
        { rel: 'canonical', href: 'https://www.smartgraphicsart.com/shop/' + this.$route.params.slug}
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
      size: 0.5,
      sizeOption: 0,
      thickness: 6,
      thicknessOption: 0,
      edge: this.background,
      edgeOption: 0,
      frame: 'transparent',
      frameOption: 0,
      zoom: 1,
      image: 0,
      canvasImage: 1
    }
  },
  components: {
    Stars,
    KeyPoints
  },
  computed: {
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
      price = price + this.prices[this.sizeOption].price;

      if (this.prices[this.sizeOption].thickness) {
        price = price + this.prices[this.sizeOption].thickness[this.thicknessOption].price;
      }

      if (this.prices[this.sizeOption].edge) {
        price = price + this.prices[this.sizeOption].edge[this.edgeOption].price;
      }

      if (this.prices[this.sizeOption].frame) {
        price = price + this.prices[this.sizeOption].frame[this.frameOption].price;
      }

      return price;
    },
    extrasTotal() {
      let price = this.prices[this.sizeOption].price;

      if (this.prices[this.sizeOption].thickness) {
        price = price + this.prices[this.sizeOption].thickness[this.thicknessOption].price;
      }

      if (this.prices[this.sizeOption].edge) {
        price = price + this.prices[this.sizeOption].edge[this.edgeOption].price;
      }

      if (this.prices[this.sizeOption].frame) {
        price = price + this.prices[this.sizeOption].frame[this.frameOption].price;
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
  methods: {
    discount: function(price, discount) {
      return price - ((price / 100) * discount);
    },
    magnify(zoom) {
      this.zoom = zoom;
    },
    changeSize: function(size, sizeOption) {
      this.size = size;
      this.sizeOption = sizeOption;
      this.thickness = 6;
      this.thicknessOption = 0;
      this.edge = this.background;
      this.edgeOption = 0;
      this.frame = 'transparent';
      this.frameOption = 0;
    },
    changeThickness: function(thickenss, index) {
      this.thickness = thickenss;
      this.thicknessOption = index;
    },
    changeEdge: function(edge, index) {
      if (edge === 'background') {
        this.edge = this.background;
      } else {
        this.edge = edge;
      }

      this.edgeOption = index;
    },
    changeFrame: function(frame, index) {
      this.frame = frame;
      this.frameOption = index;
    },
    changeQuantity: function(quantity) {
      if (quantity !== 0 && quantity !== 10) {
        this.quantity = quantity;
      }
    },
    price: function(price) {
      return '$' + (Math.round(price * 100) / 100).toFixed(2)
    },
    priceFormatter: function(price) {
      return (Math.round(price * 100) / 100).toFixed(2)
    },
    addToCart: function() {
      const self = this;

      this.$store.commit('localStorage/addToCart', [this.product.id, [this.sizeOption, this.thicknessOption, this.edgeOption, this.frameOption], this.quantity]);
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
      this.size = 0.5;
      this.sizeOption = 0;
      this.thickness = 6;
      this.thicknessOption = 0;
      this.edge = this.background;
      this.edgeOption = 0;
      this.frame = 'transparent';
      this.frameOption = 0;
      this.quantity = 1;
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
    $canvasWidth: 240px;
    $canvasHeight: 340px;
    $canvasDepth: 6px;

    h2 {
      margin-top: 0;
    }

    $root: &;

    &__title {
      margin-bottom: 35px;
    }

    &__options {
      padding: 20px 0;
      border-top: 1px solid lighten($lightgrey, 40%);
      border-bottom: 1px solid lighten($lightgrey, 40%);
      margin-bottom: 25px;
    }

    &__option {
      margin-bottom: 35px;

      &:last-child {
        margin-bottom: 0;
      }

      h5 {
        margin-bottom: 10px;
        text-decoration: underline;
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
      padding: 10px 20px;
      font-size: 0.8em;
      margin-right: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
      margin-bottom: 10px;
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

      @media (min-width: $large) {
        height: 600px;
      }

      img {
        height: 100%;
        object-fit: contain;
        display: block;
        margin: 0 auto;
      }
    }

    &__dynamic-preview {
      border: 2px solid lighten($lightgrey, 40%);
      background-size: cover;
      background-position: center;
      padding-top: 50px;
      margin-bottom: -300px;
      transform-origin: left top;
      transform: scale(0.5);
      width: 200%;
      height: 600px;

      @media (min-width: $large) {
        transform: scale(1);
        width: 100%;
        padding-top: 100px;
        margin-bottom: 0;
        background-position: center top;
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
      box-shadow: 5px 0px 25px 3px rgba(0,0,0,0.35);
      background-size: 101%;
      transform-origin: top center;
      transition: all .3s ease;
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
      border: 5px solid #000;
      position: relative;

      &::after {
        content: '';
        display: block;
        border: 1px solid lighten($lightgrey, 40%);
        padding: 5px;
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
