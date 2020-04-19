<template>
  <div v-if="product">
    <h2>Produkt</h2>

    <div class="content">
      <form class="form">
        <b-field class="form__input" label="Nazwa produktu">
          <b-input placeholder="Nazwa produktu" v-model="title" required></b-input>
        </b-field>

        <b-field message='Musi byc unikatowe. Zamiast spacji dac myslnik, male litery np. "i-love-chicago-i"' class="form__input" label="Identyfikator produktu">
          <b-input placeholder="Identyfikator produktu" v-model="slug" disabled></b-input>
        </b-field>

        <b-field label="Kategoria">
          <b-select placeholder="Wybierz kategorie" v-model="category" required>
            <option
              v-for="option in categories"
              :value="option.slug"
              :key="option.slug">
              {{ option.title }}
            </option>
          </b-select>
        </b-field>

        <b-field message="890x585 jesli poziome, 585x890 jesli pionowe, najlepiej .jpg" class="form__input" label="Zdjecie na dynamiczny podglad">
          <b-input placeholder="Zdjecie na dynamiczny podglad" v-model="canvasImage" required></b-input>
        </b-field>

        <b-field message="890x585 lub 585x890, najlepiej .jpg" class="form__input" label="Zdjecie produktu">
          <b-input placeholder="Zdjecie produktu" v-model="image" required></b-input>
        </b-field>

        <b-field message="890x585 lub 585x890, najlepiej .jpg" class="form__input" label="Dodatkowe zdjecie produktu (2)">
          <b-input placeholder="Dodatkowe zdjecie produktu (2)" v-model="image2"></b-input>
        </b-field>

        <b-field message="890x585 lub 585x890, najlepiej .jpg" class="form__input" label="Dodatkowe zdjecie produktu (3)">
          <b-input placeholder="Dodatkowe zdjecie produktu (3)" v-model="image3"></b-input>
        </b-field>

        <b-field message="890x585 lub 585x890, najlepiej .jpg" class="form__input" label="Dodatkowe zdjecie produktu (4)">
          <b-input placeholder="Dodatkowe zdjecie produktu (4)" v-model="image4"></b-input>
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
      slug: '',
      category: '',
      image: '',
      image2: '',
      image3: '',
      image4: '',
      canvasImage: '',
      price: 0,
      discount: 0,
      landscape: "false",
      tags: [],
      latestId: 0,
      file: null
    }
  },
  layout: 'dashboard',
  computed: {
    categories() {
      let categories = this.$store.state.categories;
      return categories;
    },
    id() {
      return this.$route.params.id;
    },
    product() {
      let product = this.$store.state.products.filter(product => product.id === parseInt(this.id));
      product = product[0];
      this.title = product.title;
      this.slug = product.slug;
      this.category = product.category;
      this.canvasImage = product.canvasImage;
      this.image = product.image;
      this.image2 = product.image2;
      this.image3 = product.image3;
      this.image4 = product.image4;
      this.price = product.price;
      this.discount = product.discount;
      this.landscape = product.landscape.toString();
      this.tags = product.tags.split(',');

      return product;
    },
  },
  methods: {
    editProduct: function() {
      if (
        this.title === '' ||
        this.slug === '' ||
        this.image === '' ||
        this.canvasImage === '' ||
        this.price === 0
      ) {
        this.$store.commit('addMessage', ['Cos jest nie tak, sprawdz wszystkie pola.', 'bad']);
      } else {
        this.$store.dispatch('redirecting');

        this.$store.commit('editProduct', [this.product.id, {
          title: this.title,
          image: this.image,
          image2: this.image2,
          image3: this.image3,
          image4: this.image4,
          canvasImage: this.canvasImage,
          price: this.price,
          discount: this.discount,
          category: this.category,
          landscape: this.landscape === 'true' ? true : false,
          tags: this.tags.join(", ")
        }]);

        this.$buefy.toast.open({message: 'Zmiany zostaly zapisane!', type: 'is-success'});
      }
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

    &__input-description {
      font-size: 0.6em;
    }
  }
</style>
