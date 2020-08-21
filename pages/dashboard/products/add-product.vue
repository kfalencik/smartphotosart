<template>
  <div>
    <h2>Dodaj produkt</h2>

    <div class="content">
      <form class="form">
        <b-field class="form__input" label="Nazwa produktu">
          <b-input placeholder="Nazwa produktu" v-model="title" required></b-input>
        </b-field>

        <b-field message='Musi byc unikatowe np. "000777"' class="form__input" label="Identyfikator produktu">
          <b-input placeholder="Identyfikator produktu" v-model="slug" required></b-input>
        </b-field>

        <b-field class="form__input" label="Opis">
          <b-input maxlength="1000" type="textarea" placeholder="Opis produktu" v-model="description"></b-input>
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
                {{props.option.slug}}
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
          <span class="file-thumbnail" v-if="image1">
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
          <span class="file-thumbnail" v-if="image2">
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
          <span class="file-thumbnail" v-if="image3">
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
          <span class="file-thumbnail" v-if="image4">
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
          <span class="file-thumbnail" v-if="image5">
            <img :src="image5URL" />
          </span>
        </b-field>

        <b-field message='W dolarach np. "120.99"' class="form__input" label="Cena">
          <b-input placeholder="Cena" v-model="price" required></b-input>
        </b-field>

        <b-field message='W procentach np. "20"' class="form__input" label="Znizka">
          <b-input placeholder="Znizka" v-model="discount" required></b-input>
        </b-field>

        <b-field label="Orientacja">
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
          <button type="button" @click="addProduct" class="button is-success">Dodaj produkt</button>
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
      price: 0,
      discount: 0,
      landscape: "true",
      tags: '',
      latestId: 0,
      image1: null,
      image1URL: null,
      image2: null,
      image2URL: null,
      image3: null,
      image3URL: null,
      image4: null,
      image4URL: null,
      image5: null,
      image5URL: null
    }
  },
  layout: 'dashboard',
  computed: {
    categoriesSelect() {
      this.category = this.$store.state.categories[0].slug;
      return this.$store.state.categories;
    },
    products() {
      return this.$store.state.products;
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
    }
  },
  methods: {
    addProduct: function() {
      if (
        this.title === '' ||
        this.slug === '' ||
        this.price === 0 ||
        this.image1 === null ||
        this.image2 === null ||
        this.image3 === null ||
        this.image4 === null ||
        this.image5 === null ||
        this.categories === [] ||
        this.tags === ''
      ){
        this.$store.commit('addMessage', ['Cos jest nie tak, sprawdz wszystkie pola.', 'bad']);
      } else {
        this.$store.dispatch('redirecting');

        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();

        date = yyyy + '-' + mm + '-' + dd;

        this.products.forEach(product => {
          if (parseInt(product.id) > this.latestId) {
            this.latestId = product.id;
          }
        })

        this.latestId = this.latestId + 1;

        this.$store.commit('addProduct', [
          {
            id: this.latestId,
            title: this.title,
            description: this.description,
            slug: this.slug,
            categories: this.categories.map(item => item.slug).join(", "),
            price: this.price,
            discount: parseInt(this.discount),
            landscape: this.landscape === 'true' ? true : false,
            tags: this.tags.join(", "),
            date: date,
            bought: 0
          },
          [
            this.image1, this.image2, this.image3, this.image4, this.image5
          ]
        ]);

        this.$buefy.toast.open({message: 'Produkt zostal dodany!', type: 'is-success'});
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
    }

    &__input-description {
      font-size: 0.6em;
    }
  }
</style>
