<template>
  <div v-if="product">
    <h2>Produkt</h2>

    <div class="content">
      <form class="form">
        <b-field class="form__input" label="Nazwa produktu">
          <b-input placeholder="Nazwa produktu" v-model="title" required></b-input>
        </b-field>

        <b-field message='Musi byc unikatowe np. "000777"' class="form__input" label="Identyfikator produktu">
          <b-input placeholder="Identyfikator produktu" v-model="slug" disabled></b-input>
        </b-field>

        <b-field class="form__input" label="Opis">
          <b-input maxlength="1000" type="textarea"  v-model="description" placeholder="Opis produktu"></b-input>
        </b-field>

        <b-field class="form__input" message="Wybierz przynajmniej jedna kategorie" label="Katergorie">
          <b-taginput
            v-model="categories"
            ellipsis
            autocomplete
            :allow-new="false"
            :data="categoriesSelect"
            maxtags="3"
            :openOnFocus="true"
            @typing="getFilteredTags"
            field="title"
            icon="label"
            placeholder="Wybierz kategorie">
              <template slot-scope="props">
                {{props.option.title}}
              </template>
          </b-taginput>
        </b-field>

        <b-field class="form__input file" label="Glowne zdjecie produktu">
          <b-upload v-model="image1" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-thumbnail" v-if="image1URL">
            <img :src="image1URL" />
          </span>
        </b-field>

        <b-field class="form__input file" label="Zdjecie 3D produktu">
          <b-upload v-model="image2" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-thumbnail" v-if="image2URL">
            <img :src="image2URL" />
          </span>
        </b-field>

        <b-field class="form__input file" label="Zdjecie na scianie 1">
          <b-upload v-model="image3" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-thumbnail" v-if="image3URL">
            <img :src="image3URL" />
          </span>
        </b-field>

        <b-field class="form__input file" label="Zdjecie na scianie 2">
          <b-upload v-model="image4" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-thumbnail" v-if="image4URL">
            <img :src="image4URL" />
          </span>
        </b-field>

        <b-field class="form__input file" label="Zdjecie na scianie 3">
          <b-upload v-model="image5" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-thumbnail" v-if="image5URL">
            <img :src="image5URL" />
          </span>
        </b-field>

        <b-field message='W dolarach np. "120.99"' class="form__input" label="Cena">
          <b-input placeholder="Cena" v-model="price" required></b-input>
        </b-field>

        <b-field message='W procentach np. "20"' class="form__input" label="Znizka">
          <b-input placeholder="Znizka" v-model="discount" required></b-input>
        </b-field>

        <b-field class="form__input" label="Ilosc sprzedazy">
          <b-input placeholder="Ilosc sprzedazy" v-model="bought" required></b-input>
        </b-field>

        <b-field class="form__input">
          <label class="checkbox">
            <input type="checkbox" v-model="panorama"> Panoarama?
          </label>
        </b-field>

        <template v-if="panorama">
          <b-field class="form__input file" label="Zdjecie 3D produktu (Panorama)">
            <b-upload v-model="image6" required>
              <a class="button is-info">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
            <span class="file-thumbnail" v-if="image6URL">
              <img :src="image6URL" />
            </span>
          </b-field>

          <b-field class="form__input file" label="Zdjecie na scianie 1 (Panorama)">
            <b-upload v-model="image7" required>
              <a class="button is-info">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
            <span class="file-thumbnail" v-if="image7URL">
              <img :src="image7URL" />
            </span>
          </b-field>

          <b-field class="form__input file" label="Zdjecie na scianie 2 (Panorama)">
            <b-upload v-model="image8" required>
              <a class="button is-info">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
            <span class="file-thumbnail" v-if="image8URL">
              <img :src="image8URL" />
            </span>
          </b-field>

          <b-field class="form__input file" label="Zdjecie na scianie 3 (Panorama)">
            <b-upload v-model="image9" required>
              <a class="button is-info">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
            <span class="file-thumbnail" v-if="image9URL">
              <img :src="image9URL" />
            </span>
          </b-field>
        </template>

        <b-field label="Orientacja" v-if="!panorama">
          <b-select placeholder="Wybierz orientacje" v-model="landscape" required>
            <option value="true">Pozioma</option>
            <option value="false">Pionowa</option>
          </b-select>
        </b-field>

        <b-field class="form__input" message="Beda uzyte w wyszukiwarce produktow. Najelpiej dodac ok 5-10" label="Dodaj tagi">
          <b-taginput
            v-model="tags"
            ellipsis
            icon="label"
            placeholder="Dodaj">
          </b-taginput>
        </b-field>

        <div class="form__input form__input--buttons">
          <button type="button" @click.stop="editProduct" class="button is-success">Zapisz zmiany</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      slug: '',
      categories: [],
      categoriesSelect: [],
      price: 0,
      discount: 0,
      bought: 0,
      panorama: true,
      landscape: "false",
      tags: [],
      latestId: 0,
      file: null,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
      image6: null,
      image7: null,
      image8: null,
      image9: null,
      image1URL: null,
      image2URL: null,
      image3URL: null,
      image4URL: null,
      image5URL: null,
      image6URL: null,
      image7URL: null,
      image8URL: null,
      image9URL: null
    }
  },
  layout: 'dashboard',
  computed: {
    id() {
      return this.$route.params.id;
    },
    product() {
      let product = this.$store.state.products.filter(product => product.id === parseInt(this.id));
      product = product[0];
      this.title = product.title;
      this.description = product.description;
      this.slug = product.slug;
      this.categoriesSelect = this.$store.state.categories
      this.price = product.price;
      this.discount = product.discount;
      this.bought = product.bought;
      this.panorama = product.panorama
      this.landscape = product.panorama ? true : product.landscape.toString();
      this.tags = product.tags ? product.tags.split(',') : [];
      this.categories = product.categories ? product.categories.split(', ').map(item => this.categoriesSelect.filter(category => category.slug === item)[0]) : [];
      
      this.image1URL = product.image1
      this.image2URL = product.image2
      this.image3URL = product.image3
      this.image4URL = product.image4
      this.image5URL = product.image5
      this.image6URL = product.image6
      this.image7URL = product.image7
      this.image8URL = product.image8
      this.image9URL = product.image9

      return product;
    }
  },
  watch: {
    image1 (o) {
      if (!this.image1 || this.image1.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Zly typ pliku. Sprawdz czy zdjecie jest w dobrym formacie.', 'bad']);
        this.image1 = null
        this.image1URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image1URL = e.target.result
        
        this.image1URL = reader.readAsDataURL(o);
      }
    },
    image2 (o) {
      if (!this.image2 || this.image2.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Zly typ pliku. Sprawdz czy zdjecie jest w dobrym formacie.', 'bad']);
        this.image2 = null
        this.image2URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image2URL = e.target.result
        
        this.image2URL = reader.readAsDataURL(o);
      }
    },
    image3 (o) {
      if (!this.image3 || this.image3.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Zly typ pliku. Sprawdz czy zdjecie jest w dobrym formacie.', 'bad']);
        this.image3 = null
        this.image3URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image3URL = e.target.result
        
        this.image3URL = reader.readAsDataURL(o);
      }
    },
    image4 (o) {
      if (!this.image4 || this.image4.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Zly typ pliku. Sprawdz czy zdjecie jest w dobrym formacie.', 'bad']);
        this.image4 = null
        this.image4URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image4URL = e.target.result
        
        this.image4URL = reader.readAsDataURL(o);
      }
    },
    image5 (o) {
      if (!this.image5 || this.image5.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Zly typ pliku. Sprawdz czy zdjecie jest w dobrym formacie.', 'bad']);
        this.image5 = null
        this.image5URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image5URL = e.target.result
        
        this.image5URL = reader.readAsDataURL(o);
      }
    },
    image6 (o) {
      if (!this.image6 || this.image6.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Zly typ pliku. Sprawdz czy zdjecie jest w dobrym formacie.', 'bad']);
        this.image6 = null
        this.image6URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image6URL = e.target.result
        
        this.image6URL = reader.readAsDataURL(o);
      }
    },
    image7 (o) {
      if (!this.image7 || this.image7.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Zly typ pliku. Sprawdz czy zdjecie jest w dobrym formacie.', 'bad']);
        this.image7 = null
        this.image7URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image7URL = e.target.result
        
        this.image7URL = reader.readAsDataURL(o);
      }
    },
    image8 (o) {
      if (!this.image8 || this.image8.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Zly typ pliku. Sprawdz czy zdjecie jest w dobrym formacie.', 'bad']);
        this.image8 = null
        this.image8URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image8URL = e.target.result
        
        this.image8URL = reader.readAsDataURL(o);
      }
    },
    image9 (o) {
      if (!this.image9 || this.image9.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Zly typ pliku. Sprawdz czy zdjecie jest w dobrym formacie.', 'bad']);
        this.image9 = null
        this.image9URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image9URL = e.target.result
        
        this.image9URL = reader.readAsDataURL(o);
      }
    }
  },
  methods: {
    editProduct: function() {
      if (
        this.title === '' ||
        this.slug === '' ||
        this.price === 0 ||
        this.categories === [] ||
        this.tags === '' ||
        this.bought === ''
      ) {
        this.$store.commit('addMessage', ['Cos jest nie tak, sprawdz wszystkie pola.', 'bad']);
      } else {
        this.$store.dispatch('redirecting');

        const imagesUpload = [
          {
            id: 1,
            image: this.image1
          },
          {
            id: 2,
            image: this.image2
          },
          {
            id: 3,
            image: this.image3
          },
          {
            id: 4,
            image: this.image4
          },
          {
            id: 5,
            image: this.image5
          }
        ]

        if (this.panorama) {
          imagesUpload.push(
            {
              id: 6,
              image: this.image6
            },
            {
              id: 7,
              image: this.image7
            },
            {
              id: 8,
              image: this.image8
            },
            {
              id: 9,
              image: this.image9
            }
          )
        }

        this.$store.commit('editProduct', [
          this.product.id, 
          {
            title: this.title,
            slug: this.slug,
            description: this.description,
            price: this.price,
            discount: this.discount,
            bought: this.bought,
            panorama: this.panorama,
            categories: this.categories.map(item => item.slug).join(", "),
            landscape: this.landscape === 'true' ? true : false,
            tags: this.tags.join(", ")
          },
          imagesUpload
        ]);

        this.$buefy.toast.open({message: 'Zmiany zostaly zapisane!', type: 'is-success'});
      }
    },

    getFilteredTags(text) {
      const data = this.$store.state.categories;
      this.categoriesSelect = data.filter((option) => option.title.toLowerCase().indexOf(text.toLowerCase()) >= 0)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    min-height: 60vh;
  }

  .form {
    &__input {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      max-width: 500px;

      label {
        font-weight: bold;
        font-size: 0.8em;
      }
    }

    .file-thumbnail {
      margin-top: 15px; 

      img {
        max-height: 200px;
      }
    }

    &__input-description {
      font-size: 0.6em;
    }
  }
</style>
