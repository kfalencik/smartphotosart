<template>
  <div>
    <div>
      <div class="section section--page">
        <div :class="{'product container': true, 'product--landscape': orientation === 'landscape'}">

          <template v-if="overlay && image !== galleryMax">
            <div class="product__overlay" @click="overlay = false">
              <template v-if="productInfo.format === 0 || product.customSize">
                <img :src="product.image1" v-if="image === 1" role="presentation" alt="" />
                <img :src="product.image2" v-if="image === 2" role="presentation" alt="" />
                <img :src="product.image3" v-if="image === 3" role="presentation" alt="" />
                <img :src="product.image4" v-if="image === 4" role="presentation" alt="" />
                <img :src="product.image5" v-if="image === 5" role="presentation" alt="" />
                <img v-if="orientation === 'landscape' && image === 6 && !product.customSize" src="~/assets/images/comparison_landscape.jpg" role="presentation" alt="" />
                <img v-if="orientation !== 'landscape' && image === 6 && !product.customSize" src="~/assets/images/comparison_portrait.jpg" role="presentation" alt="" />
              </template>

              <template v-else>
                <img :src="product.image10" v-if="image === 1" role="presentation" alt="" />
                <img :src="product.image6" v-if="image === 2" role="presentation" alt="" />
                <img :src="product.image7" v-if="image === 3" role="presentation" alt="" />
                <img :src="product.image8" v-if="image === 4" role="presentation" alt="" />
                <img :src="product.image9" v-if="image === 5" role="presentation" alt="" />
                <img v-if="product.panorama && image === 6" src="~/assets/images/comparison_panorama.jpg" role="presentation" alt="" />
              </template>

              <button @click.prevent.stop="image === 1 ? image = galleryMax : image = image - 1" class="product__nav-item" title="Previous">
                <b-icon icon="arrow-left"></b-icon>
              </button>
              <button @click.prevent.stop="image === galleryMax ? image = 1 : image = image + 1" class="product__nav-item" title="Next">
                <b-icon icon="arrow-right"></b-icon>
              </button>

              <button class="close" @click="overlay = false" title="Close">
                <b-icon icon="close"></b-icon>
              </button>
            </div>
          </template>

          <template v-if="informationModal">
            <div class="product__information-overlay" @click="informationModal = false">
              <div class="product__information-overlay-wrapper" @click.stop.prevent="">
                <template v-if="informationType === 'size'">
                  <h2>Custom orders</h2>
                  <p>We try very hard to provide you with the best options on our website, but we do understand that some of our clients might require a custom size order. If you do need a different size or require any other adjustments to your chosen artwork, please use our integrated support message system (available in the bottom right corner) or send us an email on <a href="mailto:studio@falencik.com">studio@falencik.com</a>.</p>
                </template>

                <template v-if="informationType === 'material'">
                  <div class="columns is-2">
                    <div class="column is-full"><button v-for="(option, index) in materials" :key="'material-' + index" :class="{'product__button': true, 'product__button--active': informationModalOption === index}" @click="changeInformationOption(index)">{{option.title}}</button></div>
                    <div class="column is-half">
                      <img :src="require('@/assets/images/info/' + materials[informationModalOption].image)" v-if="materials[informationModalOption].image" :alt="materials[informationModalOption].title + ' preview'" />
                    </div>
                    <div class="column is-half">
                      <h3>{{materials[informationModalOption].title}}</h3>
                      <div v-html="materials[informationModalOption].description"></div>
                    </div>
                  </div>
                </template>

                <template v-if="informationType === 'finishes'">
                  <div class="columns is-2">
                    <div class="column is-full">
                      <button v-for="(option, index) in materials[productInfo.material].finishes" :key="'finish-' + index" :class="{'product__button': true, 'product__button--active': informationModalOption === index}" @click="changeInformationOption(index)">{{option.title}}</button>
                    </div>
                    <div class="column is-half">
                      <img :src="require('@/assets/images/info/' + materials[productInfo.material][informationType][informationModalOption].image)" v-if="materials[productInfo.material][informationType][informationModalOption].image" :alt="materials[productInfo.material][informationType][informationModalOption].title + ' preview'" />
                    </div>
                    <div class="column is-half">
                      <h3>{{materials[productInfo.material][informationType][informationModalOption].title}}</h3>
                      <div v-html="materials[productInfo.material][informationType][informationModalOption].description"></div>
                    </div>
                  </div>
                </template>

                <template v-if="informationType === 'styles'">
                  <div class="columns is-2">
                    <div class="column is-full">
                      <button v-for="(option, index) in materials[productInfo.material]['finishes'][productInfo.finish].styles" :key="'finish-' + index" :class="{'product__button': true, 'product__button--active': informationModalOption === index}" @click="changeInformationOption(index)">{{option.title}}</button>
                    </div>
                    <div class="column is-half">
                      <img :src="require('@/assets/images/info/' + materials[productInfo.material]['finishes'][productInfo.finish]['styles'][informationModalOption].image)" v-if="materials[productInfo.material]['finishes'][productInfo.finish]['styles'][informationModalOption].image" :alt="materials[productInfo.material]['finishes'][productInfo.finish]['styles'][informationModalOption].title + ' preview'" />
                    </div>
                    <div class="column is-half">
                      <h3>{{materials[productInfo.material]['finishes'][productInfo.finish]['styles'][informationModalOption].title}}</h3>
                      <div v-html="materials[productInfo.material]['finishes'][productInfo.finish]['styles'][informationModalOption].description"></div>
                    </div>
                  </div>
                </template>

                <template v-if="informationType === 'frames'">
                  <div class="columns is-2">
                    <div class="column is-full">
                      <button v-for="(option, index) in materials[productInfo.material].frames" :key="'finish-' + index" :class="{'product__button': true, 'product__button--active': informationModalOption === index}" @click="changeInformationOption(index)">{{option.title}}</button>
                    </div>
                    <div class="column is-half">
                      <img :src="require('@/assets/images/info/' + materials[productInfo.material]['frames'][informationModalOption].image)" v-if="materials[productInfo.material]['frames'][informationModalOption].image" :alt="materials[productInfo.material]['frames'][informationModalOption].title + ' preview'" />
                    </div>
                    <div class="column is-half">
                      <h3>{{materials[productInfo.material]['frames'][informationModalOption].title}}</h3>
                      <div v-html="materials[productInfo.material]['frames'][informationModalOption].description"></div>
                    </div>
                  </div>
                </template>

                <button @click="informationModal = false" class="close" title="Close">
                  <b-icon icon="close"></b-icon>
                </button>
              </div>   
            </div>
          </template>

          <div class="mt-4">
            <router-link to="/shop"><b-icon icon="chevron-left" size="is-small"></b-icon>Back to shop</router-link>
          </div>

          <div class="page-header">
            <h2>{{product.title}}</h2>
            <Stars :product="product.id" link="true" />
            <p v-if="product.description" v-html="product.description"></p>
            <p v-else>All of our prints are high-resolution images, printed with acid-free ink on best quality canvas. Please use the widget below to customize canvas size, edge colour, frame and more.</p>
            <div class="product__sku"><strong>SKU</strong>: {{product.slug}}<span v-if="product.limitedEdition">, <strong>Limited edition</strong>: {{ product.sold || 0 }}/{{ product.limitedEditionTotal || 0 }}</span></div>
          </div>

          <div class="columns is-4">
            <div class="column is-two-thirds"></div>
            <div class="column is-one-third">
              <div class="product__navigation has-text-right">
                <span @click="nextProduct('next')"><b-icon icon="chevron-left" size="is-small"></b-icon> Previous Product</span>
                &nbsp; &nbsp; &nbsp;
                <span @click="nextProduct('prev')">Next Product <b-icon icon="chevron-right" size="is-small"></b-icon></span>
              </div>
            </div>
          </div>
          
          <div class="columns is-4">
            <div class="column is-two-thirds">
              <template v-if="image === galleryMax && !product.customSize">
                <div class="product__dynamic-preview" :style="{ 'background-image': 'url(' + require('@/assets/images/product-' + orientation + '-background-' + canvasImage + '.jpg') + ')' }" >
                  <div class="product__canvas" :style="{ 'background-image': 'url(' + (orientation === 'landscape' && productInfo.format === 1 ? product.image10 : product.image1) + ')', 'transform': 'scale(' + formats[productInfo.format].sizes[productInfo.size].action + ')', width: orientation === 'landscape' ? productInfo.format === 1 ? '600px' : '480px' : '310px', height: orientation === 'landscape' ? productInfo.format === 1 ? '345px' : '310px' : '480px' }">
                    <div class="product__frame" v-if="materials[productInfo.material].frames && materials[productInfo.material].frames[productInfo.frame].action !== 'transparent'" :style="{'border-color': materials[productInfo.material].frames[productInfo.frame].action}"></div>
                  </div>

                  <button @click="image === 1 ? image = galleryMax : image = image - 1" class="product__nav-item" title="Previous">
                    <b-icon icon="arrow-left"></b-icon>
                  </button>
                  <button @click="image === galleryMax ? image = 1 : image = image + 1" class="product__nav-item" title="Next">
                    <b-icon icon="arrow-right"></b-icon>
                  </button>
                </div>
              </template>

              <template v-else>
                <div class="product__image">
                  <template v-if="productInfo.format === 0 || product.customSize">
                    <img :src="product.image1" v-if="image === 1" role="presentation" alt="" />
                    <img :src="product.image2" v-if="image === 2" role="presentation" alt="" />
                    <img :src="product.image3" v-if="image === 3" role="presentation" alt="" />
                    <img :src="product.image4" v-if="image === 4" role="presentation" alt="" />
                    <img :src="product.image5" v-if="image === 5" role="presentation" alt="" />
                    <img v-if="orientation === 'landscape' && image === 6 && !product.customSize" :src="require('@/assets/images/comparison_landscape.jpg')" role="presentation" alt="" />
                  </template>

                  <template v-if="productInfo.format === 1 && !product.customSize">
                    <img :src="product.image10" v-if="image === 1" role="presentation" alt="" />
                    <img :src="product.image6" v-if="image === 2" role="presentation" alt="" />
                    <img :src="product.image7" v-if="image === 3" role="presentation" alt="" />
                    <img :src="product.image8" v-if="image === 4" role="presentation" alt="" />
                    <img :src="product.image9" v-if="image === 5" role="presentation" alt="" />
                    <img v-if="product.panorama && image === 6" :src="require('@/assets/images/comparison_panorama.jpg')" role="presentation" alt="" />
                  </template>

                  <img v-if="orientation !== 'landscape' && image === 6 && !product.customSize" :src="require('@/assets/images/comparison_portrait.jpg')" role="presentation" alt="" />

                  <button @click="overlay = true" class="product__image-fullscreen" title="Full screen">
                    <b-icon icon="fullscreen"></b-icon>
                  </button>
                  <button @click="image === galleryMax ? image = 1 : image = image + 1" class="product__nav-item" title="Next">
                    <b-icon icon="arrow-right"></b-icon>
                  </button>
                  <button @click="image === 1 ? image = galleryMax : image = image - 1" class="product__nav-item" title="Previous">
                    <b-icon icon="arrow-left"></b-icon>
                  </button>
                </div>
                <div v-if="product.limitedEdition" class="product__limited-edition">
                  <img :src="require('@/assets/images/icons/icon-limited-edition.png')" width="90" alt="" role="presentation" />
                </div>
              </template>

              <p class="small">Please note the preview above is just for demonstration purpouses. The actual size and colours might be slightly different.</p>

              <div class="product__thumbnails"> 
                <template v-if="productInfo.format === 0 || product.customSize">
                  <div class="product__thumbnails-item" @click="image = 1;" :class="{'product__thumbnails-item--active': image === 1}">
                    <img :src="product.image1" alt="Thumbnail 1" />
                  </div>
                  <div class="product__thumbnails-item" @click="image = 2;" :class="{'product__thumbnails-item--active': image === 2}">
                    <img :src="product.image2" alt="Thumbnail 2" />
                  </div>
                  <div class="product__thumbnails-item" @click="image = 3;" :class="{'product__thumbnails-item--active': image === 3}">
                    <img :src="product.image3" alt="Thumbnail 3" />
                  </div>
                  <div class="product__thumbnails-item" @click="image = 4;" :class="{'product__thumbnails-item--active': image === 4}">
                    <img :src="product.image4" alt="Thumbnail 4" />
                  </div>
                  <div class="product__thumbnails-item" @click="image = 5;" :class="{'product__thumbnails-item--active': image === 5}">
                    <img :src="product.image5" alt="Thumbnail 5" />
                  </div>
                  <div v-if="!product.customSize" class="product__thumbnails-item" @click="image = 6;" :class="{'product__thumbnails-item--active': image === 6}">
                    <img v-if="orientation === 'landscape'" src="~/assets/images/comparison_landscape.jpg" role="presentation" alt="Size comparison" />
                    <img v-else src="~/assets/images/comparison_portrait.jpg" alt="Size comparison" />
                  </div>
                </template>

                <template v-if="productInfo.format === 1 && ! product.customSize">
                  <div class="product__thumbnails-item" @click="image = 1;" :class="{'product__thumbnails-item--active': image === 1}">
                    <img :src="product.image10" alt="Thumbnail 1" />
                  </div>
                  <div class="product__thumbnails-item" @click="image = 2;" :class="{'product__thumbnails-item--active': image === 2}">
                    <img :src="product.image6" alt="Thumbnail 2" />
                  </div>
                  <div class="product__thumbnails-item" @click="image = 3;" :class="{'product__thumbnails-item--active': image === 3}">
                    <img :src="product.image7" alt="Thumbnail 3" />
                  </div>
                  <div class="product__thumbnails-item" @click="image = 4;" :class="{'product__thumbnails-item--active': image === 4}">
                    <img :src="product.image8" alt="Thumbnail 4" />
                  </div>
                  <div class="product__thumbnails-item" @click="image = 5;" :class="{'product__thumbnails-item--active': image === 5}">
                    <img :src="product.image9" alt="Thumbnail 5" />
                  </div>
                  <div v-if="product.panorama" class="product__thumbnails-item" @click="image = 6;" :class="{'product__thumbnails-item--active': image === 6}">
                    <img src="~/assets/images/comparison_panorama.jpg" role="presentation" alt="Size comparison" />
                  </div>
                </template>

                <div v-if="!product.customSize" class="product__thumbnails-item product__thumbnails-item--preview" :class="{'product__thumbnails-item--active': image === galleryMax}" aria-label="Dynamic preview" @click="image = galleryMax;">
                  <b-icon icon="image-area"></b-icon>
                  Dynamic preview
                </div>
              </div>
            </div>
            
            <div class="product__details column is-one-third">
              <div class="product__options">
                <div class="product__option product__option--with-guide">
                  <h5 @click="information('material', productInfo.material)">Material <span class="guide"><b-icon icon="information-outline" custom-size="mdi-18" /> MATERIAL GUIDE</span></h5>
                  <div class="wrap">
                    <b-field>
                      <b-select placeholder="Select Material" required :value="productInfo.material" ref="material" @change.native="changeMaterial">
                        <option
                          v-for="(option, index) in materials"
                          :value="index"
                          :key="'material-' + index">
                          {{option.title}}
                        </option>
                      </b-select>
                    </b-field>
                  </div>
                  
                </div>

                <div class="product__option product__option--with-guide">
                  <h5 @click="information('finishes', productInfo.finish)">Media <span class="guide" v-if="finishes.length > 1"><b-icon icon="information-outline" custom-size="mdi-18" /> MEDIA GUIDE</span></h5>
                  <div class="wrap">
                    <b-field>
                      <b-select placeholder="Select Media" required :value="productInfo.finish" ref="finish" @input="changeProduct" :disabled="finishes.length === 1">
                        <template v-for="(option, index) in finishes">
                          <option
                            :value="index"
                            :key="'finish-' + index">
                            {{option.title}}
                          </option>
                        </template>
                      </b-select>
                    </b-field>
                  </div>
                </div>

                <div class="product__option product__option--with-guide">
                  <h5 @click="information('styles', productInfo.style)">Style <span v-if="styles.length > 1" class="guide"><b-icon icon="information-outline" custom-size="mdi-18" /> STYLE GUIDE</span></h5>
                  <div class="wrap">
                    <b-field>
                      <b-select placeholder="Select Style" required :value="productInfo.style" ref="style" @input="changeProduct" :disabled="styles.length === 1">
                        <template v-for="(option, index) in styles">
                          <option
                            :value="index"
                            :key="'style-' + index">
                            {{option.title}}
                          </option>
                        </template>
                      </b-select>
                    </b-field>
                  </div>
                </div>

                <div class="product__option" v-if="product.panorama || !product.customSize">
                  <h5>Format</h5>
                  <div class="wrap">
                    <b-field>
                      <b-select placeholder="Select Format" required :value="productInfo.format" ref="format" @input="changeProduct" :disabled="!panorama">
                        <template v-for="(option, index) in formats">
                          <option
                            v-if="index === 0 || panorama"
                            :value="index"
                            :key="'format-' + index">
                            {{option.title}}
                          </option>
                        </template>
                      </b-select>
                    </b-field>
                  </div>
                </div>

                <div class="product__option product__option--with-guide">
                  <h5 @click="information('size', 'size')">Size <span class="guide"><b-icon icon="information-outline" custom-size="mdi-18" /> Can't find the perfect size?</span></h5>
                  <div class="wrap" v-if="sizes && !product.customSize">
                    <b-field>
                      <b-select placeholder="Select Size" required :value="productInfo.size" ref="size" @input="changeProduct">
                        <template v-for="(option, index) in sizes">
                          <option
                            :value="index"
                            :key="'size-' + index">
                            {{option.title}}
                          </option>
                        </template>
                      </b-select>
                    </b-field>
                  </div>

                  <div class="wrap" v-else>
                    <b-select placeholder="Select Size" required disabled :value="1" ref="size">
                      <option
                        :value="1"
                        :key="'size-1'">
                        {{ product.customSizeName }}
                      </option>
                    </b-select>
                  </div>
                </div>

                <div class="product__option product__option--with-guide" v-if="frames">
                  <h5 @click="information('frames', productInfo.frame)">Frame <span v-if="frames.length > 1" class="guide"><b-icon icon="information-outline" custom-size="mdi-18" /> FRAME GUIDE</span></h5>
                  <div class="wrap">
                    <b-field>
                      <b-select placeholder="Select Frame" required :value="productInfo.frame" ref="frame" @input="changeProduct" :disabled="frames.length === 1">
                        <template v-for="(option, index) in frames">
                          <option
                            :value="index"
                            :key="'frame-' + index">
                            {{option.title}}
                          </option>
                        </template>
                      </b-select>
                    </b-field>
                  </div>
                </div>

                <div class="product__option product__option--with-guide" v-if="productInfo.frame && glass">
                  <h5>Glass</h5>
                  <div class="wrap">
                    <b-field>
                      <b-select placeholder="Select Glass" required :value="productInfo.glass" ref="glass" @input="changeProduct">
                        <template v-for="(option, index) in glass">
                          <option
                            :value="index"
                            :key="'frame-' + index">
                            {{option.title}}
                          </option>
                        </template>
                      </b-select>
                    </b-field>
                  </div>
                </div>
              </div>

              <div class="product__add-to-cart">
                <div class="product__add">
                  <button class="button is-black" @click="addToCart">Add to cart</button>
                </div>

                <div class="product__price">
                  <h3>{{ priceDisplay(price * quantity) }}</h3>
                </div>
              </div>

              <div class="details">
                <label for="details"><b-icon icon="information-outline"/> Price details</label>
                <input id="details" type="checkbox" class="toggler" />

                <div class="toggler-content">
                  <h5>Product</h5>
                  <table border="1">
                    <tbody>
                    <tr><td>Print price</td><td>{{ priceDisplay(product.price)}}</td></tr>
                    <tr><td>Discount</td><td>{{product.discount}}%</td></tr>
                    <tr><td><strong>Total</strong></td><td><strong>{{ priceDisplay(productTotal)}}</strong></td></tr>
                    </tbody>
                  </table>

                  <h5>Specification</h5>
                  <table border="1">
                    <tbody>
                    <tr><td>Finish</td><td>{{materials[productInfo.material].title}} / {{materials[productInfo.material].finishes[productInfo.finish].title}} / {{materials[productInfo.material].finishes[productInfo.finish][productInfo.format === 0 ? 'styles' : 'panoramaStyles'][productInfo.style].title}}</td><td>{{ priceDisplay(materials[productInfo.material].finishes[productInfo.finish][productInfo.format === 0 ? 'styles' : 'panoramaStyles'][productInfo.style].sizes[productInfo.size])}}</td></tr>
                    <tr v-if="!product.customSize"><td>Size</td><td>{{formats[productInfo.format].title}} / {{formats[productInfo.format].sizes[productInfo.size].title}}</td><td>{{ priceDisplay((productTotal * formats[productInfo.format].sizes[productInfo.size].price) - productTotal) }}</td></tr>
                    <tr v-else><td>Size</td><td>{{ product.customSizePanorama ? 'Panorama' : 'Standard' }} / {{ product.customSizeName }}</td><td>{{ priceDisplay((productTotal * formats[productInfo.format].sizes[productInfo.size].price) - productTotal) }}</td></tr>
                    <tr v-if="productInfo.frame"><td>Frame</td><td>{{materials[productInfo.material].frames[productInfo.frame].title}}</td><td>{{ priceDisplay(materials[productInfo.material].frames[productInfo.frame].sizes[productInfo.format][productInfo.size])}}</td></tr>
                    <tr v-if="productInfo.glass"><td>Glass</td><td>{{materials[productInfo.material].glass[productInfo.glass].title}}</td><td>{{ priceDisplay(materials[productInfo.material].glass[productInfo.glass].sizes[productInfo.format][productInfo.size])}}</td></tr>
                    <tr><td><strong>Extras total</strong></td><td></td><td><strong>{{ priceDisplay(extrasTotal) }}</strong></td></tr>
                    </tbody>
                  </table>

                  <h5>Totals</h5>
                  <table border="1">
                    <tbody>
                    <tr><td>Product</td><td>{{ priceDisplay(productTotal)}}</td></tr>
                    <tr><td>Extras</td><td>{{ priceDisplay(extrasTotal) }}</td></tr>
                    <!-- <tr><td>Product with extras</td><td>{{ priceDisplay(productTotal + extrasTotal) }}</td></tr> -->
                    <tr><td><strong>Total</strong></td><td><strong>{{ priceDisplay(price * quantity) }}</strong></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SimilarProducts :number="8" />

    <KeyPoints style="key-points" />
  </div>
</template>

<script>

import Stars from '~/components/Stars';
import KeyPoints from '~/components/KeyPoints';
import SimilarProducts from '~/components/SimilarProducts';

export default {
  head () {
    return {
      title: 'Peter Falencik Photography - ' + this.product.title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'art, naples, beach, falencik, property, canvas, florida, photography, wall art, beautiful, acryclic, photographer, peter falencik'},
        { hid: 'ogtitle', property: 'og:title', content: 'Peter Falencik Photography - ' + this.product.title},
        { hid: 'ogdesc', property: 'og:description', content: 'A beautiful canvas "' + this.product.title + '" for your wall'},
        { hid: 'ogtype', property: 'og:type', content: 'product.item'},
        { hid: 'ogurl', property: 'og:url', content: 'https://www.falencik.com/shop/' + this.$route.params.slug},
        { hid: 'ogimage', property: 'og:image', content: this.product.image1},
        { property: 'product:price:amount', content: this.priceFormatter(this.productTotal)},
        { property: 'product:price:currency', content: 'USD'},
        { property: 'product:retailer_item_id', content: this.product.id},
        { hid: 'twittercard', name: 'twitter:card', content: 'summary_large_image'},
        { hid: 'twittertitle', name: 'twitter:title', content: 'Peter Falencik Photography - ' + this.product.title},
        { hid: 'twitterdesc', name: 'twitter:description', content: 'A beautiful canvas "' + this.product.title + '" for your wall'},
        { hid: 'twitterimage', name: 'twitter:image', content: this.product.image1},
      ],
      link: [
        { rel: 'canonical', href: 'https://www.falencik.com/shop/' + this.$route.params.slug}
      ]
    }
  },

  jsonld() {
    return {
      "@context": "https://www.schema.org",
      "@type": "Product",
      "name": this.product.title,
      "image": [
        this.product.image1,
        this.product.image2,
        this.product.image3,
        this.product.image4,
        this.product.image5
      ],
      "brand": {
        "@type": "Brand",
        "name": "Peter Falencik Photography"
      },
      "description": this.product.description,
      "sku": this.product.slug,
      "logo": "https://falencik.com/logo.png",
      "category": this.product.category,
      "image": this.product.image1,
      "productID": this.product.id,
      "offers": {
        "@type": "Offer",
        "url": "https://falencik.com/shop/" + this.product.slug,
        "priceCurrency": "USD",
        "price": this.priceFormatter(this.productTotal),
        "priceValidUntil": "2025-11-20",
        "availability": "https://schema.org/InStock"
      }
    }
  },

  transition: 'page',

  data () {
    return {
      prodcutIndex: 0,
      quantity: 1,
      productInfo: {
        material: 0,
        finish: 0,
        style: 0,
        format: 0,
        size: 0,
        frame: 0,
        glass: 0
      },
      zoom: 1,
      image: 1,
      canvasImage: 1,
      overlay: false,
      informationModal: false,
      informationModalOption: 0,
      informationType: 'material'
    }
  },

  components: {
    Stars,
    KeyPoints,
    SimilarProducts
  },

  mounted () {
    this.productInfo.size = this.sizes.length - 1
    if (this.$store.state.orientation === 'panorama') {
      this.productInfo.format = 1
    }
    if (this.product.customSize) {
      this.productInfo.size = this.product.customSizeTemplate
    }
  },

  computed: {
    galleryMax () {
      return this.product.customSize ? 5 : 7
    },

    slug () {
      return this.$route.params.slug;
    },

    product () {
      const product = this.$store.state.products.filter((product, index) => {
        if (product.slug === this.slug) {
          this.prodcutIndex = index;
          return product
        }
      });
      return product[0];
    },

    panorama () {
      return this.materials[this.productInfo.material].panorama && this.product.panorama
    },

    materials () {
      return this.$store.state.pricing
    },

    finishes () {
      const finishes = this.materials[this.productInfo.material].finishes.filter(finish => ((this.productInfo.format === 0 && finish.styles) || (this.productInfo.format === 1 && finish.panoramaStyles)))
      if (!finishes || finishes.length - 1 < this.productInfo.finish) {
        this.$set(this.productInfo, 'finish', 0);
      }
      return finishes
    },

    styles () {
      const styles = this.productInfo.format === 0 ? this.materials[this.productInfo.material].finishes[this.productInfo.finish].styles : this.materials[this.productInfo.material].finishes[this.productInfo.finish].panoramaStyles
      if (!styles || styles.length - 1 < this.productInfo.style) {
        this.$set(this.productInfo, 'style', 0);
      }
      return styles
    },

    formats () {
      return this.$store.state.formats
    },

    sizes () {
      const sizes = this.formats[this.productInfo.format].sizes.filter((size, index) => this.materials[this.productInfo.material].finishes[this.productInfo.finish].styles[this.productInfo.style].sizes[index])
      if (!sizes || sizes.length - 1 < this.productInfo.size) {
        this.$set(this.productInfo, 'size', 0);
      }
      return sizes
    },

    frames () {
      return this.materials[this.productInfo.material].frames
    },

    glass () {
      return this.materials[this.productInfo.material].glass
    },

    price () {
      return this.productTotal + this.extrasTotal
    },

    productTotal () {
      let price = parseFloat(this.product.price);
      let discount = (price / 100) * this.product.discount;
      price = price - discount;

      return price;
    },

    extrasTotal () {
      // style
      let price = this.materials[this.productInfo.material].finishes[this.productInfo.finish][this.productInfo.format === 0 ? 'styles' : 'panoramaStyles'][this.productInfo.style].sizes[this.productInfo.size]
      // size
      price = price + ((this.productTotal * this.formats[this.productInfo.format].sizes[this.productInfo.size].price) - this.productTotal)
      // Custom size price
      if (this.product.customSize) {
        price + parseFloat(this.product.customSizePrice)
      }
      // frame
      if (this.productInfo.frame) {
        price = price + this.materials[this.productInfo.material].frames[this.productInfo.frame].sizes[this.productInfo.format][this.productInfo.size]
      }
      // glass
      if (this.productInfo.frame && this.productInfo.glass) {
        price = price + this.materials[this.productInfo.material].glass[this.productInfo.glass].sizes[this.productInfo.format][this.productInfo.size]
      }

      return price
    },

    orientation () {
      if (this.product.landscape || this.product.panorama) {
        return 'landscape';
      } else {
        return 'portrait';
      }
    },

    productReviews () {
      const reviews = this.$store.state.reviews.filter(product => product.id === this.product.id);
      return reviews;
    },

    productRating () {
      let stars = 0;
      let reviewsTotal = this.productReviews.length;
      if (reviewsTotal) {
        this.productReviews.forEach(review => {
          stars = stars + review.stars;
        });

        return Math.ceil(stars / reviewsTotal);
      } else {
        return 0
      }
    },
  
    background () {
      return `url(${this.product.image1})`;
    },

    filteredProducts() {
      return this.$store.state.filteredProducts
    }

  },

  methods: {
    changeProduct () {
      if (this.$refs.material) this.$set(this.productInfo, 'material', this.$refs.material.selected)
      else this.$set(this.productInfo, 'material', 0)

      if (this.$refs.finish) this.$set(this.productInfo, 'finish', this.$refs.finish.selected)
      else this.$set(this.productInfo, 'finish', 0
      )
      if (this.$refs.style) this.$set(this.productInfo, 'style', this.$refs.style.selected) 
      else this.$set(this.productInfo, 'style', 0)

      if (this.$refs.format) this.$set(this.productInfo, 'format', this.$refs.format.selected)
      else this.$set(this.productInfo, 'format', 0)

      if (this.$refs.size) this.$set(this.productInfo, 'size', this.$refs.size.selected)
      else this.$set(this.productInfo, 'size', this.sizes.length - 1)

      if (this.$refs.frame) this.$set(this.productInfo, 'frame', this.$refs.frame.selected)
      else this.$set(this.productInfo, 'frame', 0)

      if (this.$refs.glass) this.$set(this.productInfo, 'glass', this.$refs.glass.selected)
      else this.$set(this.productInfo, 'glass', 0)
    },

    nextProduct (direction) {
      let newProductSlug = 0;
      let productIndex = 0;

      this.filteredProducts.forEach((item, index) => {
        if (item.id === this.product.id) {
          productIndex = index
        }
      })
      
      if (direction === 'prev') {
        newProductSlug = this.filteredProducts[productIndex + 1] ? this.filteredProducts[productIndex + 1].slug : this.filteredProducts[0].slug
      } else {
        newProductSlug = this.filteredProducts[productIndex - 1] ? this.filteredProducts[productIndex - 1].slug : this.filteredProducts[this.filteredProducts.length - 1].slug
      }

      this.$router.push('/shop/' + newProductSlug)
    },

    changeMaterial () {
      if (this.$refs.material) this.$set(this.productInfo, 'material', this.$refs.material.selected)
      else this.$set(this.productInfo, 'material', 0)

      this.$set(this.productInfo, 'finish', 0)
      this.$set(this.productInfo, 'style', 0)
      this.$set(this.productInfo, 'format', 0)
      this.$set(this.productInfo, 'size', this.sizes.length - 1)
      this.$set(this.productInfo, 'frame', 0)
      this.$set(this.productInfo, 'glass', 0)
    },

    changeInformationOption (option) {
      this.informationModalOption = option
    },

    information(modal, option) {
      this.informationModalOption = option;
      this.informationModal = true;
      this.informationType = modal;
    },

    priceDisplay: function(price) {
      return '$' + (Math.floor(price * 100) / 100).toFixed(2)
    },

    priceFormatter: function(price) {
      return (Math.floor(price * 100) / 100).toFixed(2)
    },

    changeQuantity: function(quantity) {
      if (quantity !== 0 && quantity !== 10) {
        this.quantity = quantity;
      }
    },

    addToCart: function() {
      const self = this;

      this.$store.commit('localStorage/addToCart', [this.product.id, this.productInfo, this.quantity]);
      this.$buefy.snackbar.open({
        duration: 1000,
        position: 'is-top',
        message: 'Item has been added to your cart!',
        type: 'is-success',
        actionText: null,
        onAction: this.$store.commit('openCart', true)
      });
    },
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
        max-height: 96vh;
        max-width: 98%;
      }

      @media (min-width: $medium) {
        img {
          max-height: 95vh;
          max-width: 96%;
        }
      }

      button.close {
        background: $black;
        color: $white;
        position: absolute;
        top: 35px;
        right: 5px;
        border: none;
        width: 40px;
        height: 40px;
        z-index: 30;
        font-size: 12px;
        transition: all .5s ease;
        cursor: pointer;
        display: block;
        transform: translateY(-50%);

        @media (min-width: $medium) {
          top: 50px;
          right: 50px;
          background: $black;
        }

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

    &__limited-edition {
      position: absolute;
      bottom: 160px;
      left: 20px;
      z-index: 10;
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

      p {
        margin: 15px 0;
      }
    }

    &__nav-item {
      color: $black;
      position: absolute;
      top: 50%;
      left: 5px;
      border: none;
      width: 40px;
      height: 40px;
      z-index: 30;
      transition: opacity .5s ease, background .5s ease, color .5s ease;
      cursor: pointer;
      display: block;
      transform: translateY(-50%);

      @media (max-width: $medium) {
        font-size: 14px;

        .icon {
          font-size: 14px;
        }
      }

      @media (min-width: $medium) {
        left: 20px;
        background: $black;
        color: $white;
        border: 1px solid $primary;

        &:hover {
          background: $tertiary;
          color: $white;
        }
      }

      &:nth-child(3) {
        left: auto;
        right: 20px;

        @media (max-width: $medium) {
          right: 5px;
        }
      }
    }

    &__sku {
      font-size: 14px;
      color: $black;
    }

    &__options {
      padding: 0 0 15px;
      margin-bottom: 15px;
    }

    &__option {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      h5 {
        border-bottom: 1px solid $primary;
        margin-bottom: 5px;
        font-weight: bold;
      }

      &--with-guide {
        .guide {
          cursor: pointer;
          color: $lightgrey;
          font-size: 0.75em;
          float: right;
          font-family: $fontBody;

          .icon {
            margin-right: -5px;
          }
        }
      }

      select {
        width: 100%;
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

      @media (max-width: $medium) {
        justify-content: center;
        margin: 0;
      }

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
      border: 1px solid lighten($lightgrey, 35%);
      height: 300px;
      overflow: hidden;
      position: relative;

      @media (min-width: $small) {
        height: 450px;
      }


      @media (min-width: $large) {
        height: 510px;
      }

      @media (min-width: $superlarge) {
        height: 585px;
      }

      img {
        height: 100%;
        object-fit: cover;
        display: block;
        margin: 0 auto;
      }
    }

    &__image-fullscreen {
      position: absolute;
      z-index: 20;
      top: 5px;
      right: 5px;
      color: $black;
      border: none;
      width: 40px;
      height: 40px;
      z-index: 30;
      transition: all .5s ease;
      cursor: pointer;
      display: block;

      @media (max-width: $medium) {
        font-size: 14px;

        .icon {
          font-size: 14px;
        }
      }

      @media (min-width: $medium) {
        right: 20px;
        top: 20px;
        background: $black;
        color: $white;
        border: 1px solid $primary;

        &:hover {
          background: $tertiary;
          color: $white;
        }
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

      .product__image {
        img {
          width: 100%;
        }
      }

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
      
      @media (max-width: $medium) {
        justify-content: space-around;
        display: none;
      }
    }

    &__thumbnails-item {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      border: 2px solid lighten($lightgrey, 20%);
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

      @media (max-width: $medium) {
        margin: 5px;
      }

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

    &__navigation span {
      cursor: pointer;
    }
  }
</style>

<style lang="scss">
  .product__details {
    .select {
      width: 100%;

      select {
        width: 100%;
      }
    }
  }
</style>