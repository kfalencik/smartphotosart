<template>
  <div>
    <h2>Dodaj produkt</h2>

    <div class="content">
      <form class="form">
        <b-field class="form__input" label="Nazwa produktu">
          <b-input placeholder="Nazwa produktu" v-model="title" required></b-input>
        </b-field>

        <b-field message='Musi byc unikatowe. Zamiast spacji dac myslnik, male litery np. "i-love-chicago-i"' class="form__input" label="Identyfikator produktu">
          <b-input placeholder="Identyfikator produktu" v-model="slug" required></b-input>
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

        <b-field message="800x560 jesli poziome, 560x800 jesli pionowe, najlepiej .jpg" class="form__input" label="Zdjecie na podglad 3D">
          <b-input placeholder="Zdjecie na podglad 3D" v-model="canvasImage" required></b-input>
        </b-field>

        <b-field message="800x560 lub 560x800, najlepiej .jpg" class="form__input" label="Zdjecie produktu">
          <b-input placeholder="Zdjecie produktu" v-model="image" required></b-input>
        </b-field>

        <b-field message="800x560 lub 560x800, najlepiej .jpg" class="form__input" label="Dodatkowe zdjecie produktu (2)">
          <b-input placeholder="Dodatkowe zdjecie produktu (2)" v-model="image2"></b-input>
        </b-field>

        <b-field message="800x560 lub 560x800, najlepiej .jpg" class="form__input" label="Dodatkowe zdjecie produktu (3)">
          <b-input placeholder="Dodatkowe zdjecie produktu (3)" v-model="image3"></b-input>
        </b-field>

        <b-field message="800x560 lub 560x800, najlepiej .jpg" class="form__input" label="Dodatkowe zdjecie produktu (4)">
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

        <b-field class="form__input" message="Bedzie uzyte w wyszukiwarce produktow. Najelpiej dodac ok 5-10" label="Dodaj tagi">
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
            tags: '',
            latestId: 0
        }
    },
    layout: 'dashboard',
    computed: {
        categories() {
            this.category = this.$store.state.categories[0].slug;
            return this.$store.state.categories;
        },
        products() {
            return this.$store.state.products;
        }
    },
    methods: {
        addProduct: function() {
            if (
                this.title === '' ||
                this.slug === '' ||
                this.image === '' ||
                this.canvasImage === '' ||
                this.price === 0
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

                this.$store.commit('addProduct', {
                    id: this.latestId,
                    title: this.title,
                    slug: this.slug,
                    category: this.category,
                    image: this.image,
                    image2: this.image2,
                    image3: this.image3,
                    image4: this.image4,
                    canvasImage: this.canvasImage,
                    price: this.price,
                    discount: parseInt(this.discount),
                    landscape: this.landscape === 'true' ? true : false,
                    tags: this.tags.join(", "),
                    date: date,
                    bought: 0
                });

                this.$buefy.toast.open({message: 'Produkt zostal dodany!', type: 'is-success'});
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
