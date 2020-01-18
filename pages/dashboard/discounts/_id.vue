<template>
  <div v-if="discountCode">
    <h2>Kod promocyjny - {{ code }}</h2>

    <div class="content">
      <form class="form">
        <b-field class="form__input" label="Nazwa kodu">
          <b-input placeholder="Nazwa kodu" v-model="title" required></b-input>
        </b-field>

        <b-field message='Musi byc unikatowe. Najlepiej duze litery i cyfry. Bez spacji czy specjalnych znakow"' class="form__input" label="Kod">
          <b-input placeholder="Kod" v-model="code" required></b-input>
        </b-field>

        <b-field message='W procentach np. "20"' class="form__input" label="Znizka">
          <b-input placeholder="Znizka" v-model="discount" required></b-input>
        </b-field>

        <b-field message='Dzien, miesiac, rok np. 20/04/2020. Bez daty kod nigdy nie wygasnie' class="form__input" label="Data wygasniecia">
          <b-input placeholder="Data wygasniecia" v-model="expiry"></b-input>
        </b-field>

        <div class="form__input form__input--buttons">
          <button type="button" @click.stop="editDiscountCode" class="button is-success">Zapisz zmiany</button>
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
      code: '',
      expiry: '',
      discount: 0
    }
  },
  layout: 'dashboard',
  computed: {
    id() {
      return this.$route.params.id;
    },
    discountCode() {
      let discount = this.$store.state.discounts.filter(discount => discount.id === parseInt(this.id));
      discount = discount[0];
      this.title = discount.title;
      this.discount = discount.discount;
      this.expiry = discount.expiry;
      this.code = discount.code;

      return discount;
    },
  },
  methods: {
    editDiscountCode: function() {
     if (
        this.title === '' ||
        this.code === '' ||
        this.discount === 0
      ) {
        this.$store.commit('addMessage', ['Cos jest nie tak, sprawdz wszystkie pola.', 'bad']);
      } else {
        this.$store.dispatch('redirecting');
        
        this.$store.commit('editDiscountCode', [this.discountCode.id, {
          title: this.title,
          code: this.code,
          discount: this.discount,
          expiry: this.expiry,
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
