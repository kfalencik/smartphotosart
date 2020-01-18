<template>
  <div>
    <h2>Dodaj kod promocyjny</h2>

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
          <button type="button" @click="addDiscountCode" class="button is-success">Dodaj kod promocyjny</button>
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
      discount: 0,
      expiry: '',
      latestId: 0
    }
  },
  layout: 'dashboard',
  computed: {
    discounts() {
      return this.$store.state.discounts;
    }
  },
  methods: {
    addDiscountCode: function() {
      if (
        this.title === '' ||
        this.code === '' ||
        this.discount === 0
      ){
        this.$buefy.toast.open({message: 'Cos jest nie tak, sprawdz wszystkie pola', type: 'is-danger'});
      } else {
        this.$store.dispatch('redirecting');
        
        this.discounts.forEach(discount => {
          if (parseInt(discount.id) > this.latestId) {
            this.latestId = discount.id;
          }
        })

        this.latestId = this.latestId + 1;

        this.$store.commit('addDiscountCode', {
          id: this.latestId,
          title: this.title,
          code: this.code,
          discount: this.discount,
          expiry: this.expiry,
        });

        this.$buefy.toast.open({message: 'Kod zostal dodany!', type: 'is-success'});
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
