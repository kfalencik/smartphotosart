<template>
  <div>
    <div>
      <div class="section">
        <div :class="{'product container': true, 'product--landscape': product.landscape}">
          <div>
            <div class="product__details column is-one-third">
              <div class="product__options">
                <div class="product__option product__option--with-guide">
                  <h5>Material <span class="guide"><b-icon icon="information-outline" custom-size="mdi-18" /> MATERIAL GUIDE</span></h5>
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
                  <h5>Media <span class="guide"><b-icon icon="information-outline" custom-size="mdi-18" /> MEDIA GUIDE</span></h5>
                  <div class="wrap">
                    <b-field>
                      <b-select placeholder="Select Media" required :value="productInfo.finish" ref="finish" @input="changeProduct">
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
                  <h5>Style <span class="guide"><b-icon icon="information-outline" custom-size="mdi-18" /> STYLE GUIDE</span></h5>
                  <div class="wrap">
                    <b-field>
                      <b-select placeholder="Select Style" required :value="productInfo.style" ref="style" @input="changeProduct">
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

                <div class="product__option" v-if="panorama">
                  <h5>Format</h5>
                  <div class="wrap">
                    <b-field>
                      <b-select placeholder="Select Format" required :value="productInfo.format" ref="format" @input="changeProduct">
                        <template v-for="(option, index) in formats">
                          <option
                            :value="index"
                            :key="'format-' + index">
                            {{option.title}}
                          </option>
                        </template>
                      </b-select>
                    </b-field>
                  </div>
                </div>

                <div class="product__option">
                  <h5>Size</h5>
                  <div class="wrap" v-if="sizes">
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
                </div>

                <div class="product__option product__option--with-guide" v-if="frames">{{ productInfo.frame }}
                  <h5>Frame <span class="guide"><b-icon icon="information-outline" custom-size="mdi-18" /> FRAME GUIDE</span></h5>
                  <div class="wrap">
                    <b-field>
                      <b-select placeholder="Select Frame" required :value="productInfo.frame" ref="frame" @input="changeProduct">
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
                  <h5>Glass <span class="guide"><b-icon icon="information-outline" custom-size="mdi-18" /> GLASS GUIDE</span></h5>
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

              <div>Total: {{ price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slug: '000891',
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
      }
    }
  },

  computed: {
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
      return this.materials[this.productInfo.material].panorama
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
      let price = this.product.price * this.sizes[this.productInfo.size].price

      price = price + this.materials[this.productInfo.material].finishes[this.productInfo.finish].styles[this.productInfo.style].sizes[this.productInfo.size]

      if (frames && this.productInfo.frame) {
        price = price + this.materials[this.productInfo.material].frames[this.productInfo.frame].sizes[this.productInfo.format][this.productInfo.size]
      }

      if (this.glass && this.productInfo.frame && this.productInfo.glass) {
        price = price + this.materials[this.productInfo.material].glass[this.productInfo.frame].sizes[this.productInfo.format][this.productInfo.size]
      }

      return price
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
      else this.$set(this.productInfo, 'size', 0)

      if (this.$refs.frame) this.$set(this.productInfo, 'frame', this.$refs.frame.selected)
      else this.$set(this.productInfo, 'frame', 0)

      if (this.$refs.glass) this.$set(this.productInfo, 'glass', this.$refs.glass.selected)
      else this.$set(this.productInfo, 'glass', 0)
    },

    changeMaterial () {
      if (this.$refs.material) this.$set(this.productInfo, 'material', this.$refs.material.selected)
      else this.$set(this.productInfo, 'material', 0)

      this.$set(this.productInfo, 'finish', 0)
      this.$set(this.productInfo, 'style', 0)
      this.$set(this.productInfo, 'format', 0)
      this.$set(this.productInfo, 'size', 0)
      this.$set(this.productInfo, 'frame', 0)
      this.$set(this.productInfo, 'glass', 0)
    }
  }
}
</script>