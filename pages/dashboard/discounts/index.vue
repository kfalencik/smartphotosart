<template>
  <div>
    <h2>Kody promocyjne</h2>
    <router-link class="button is-black" to="/dashboard/discounts/add-code">Dodaj kod promocyjny</router-link>
    <b-table :data="discounts" :bordered="true" :striped="true" :narrowed="true" :current-page.sync="currentPage" :paginated="true" :per-page="20">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40">
          {{ props.row.id }}
        </b-table-column>
        <b-table-column field="code" label="Kod">
          {{ props.row.code }}
        </b-table-column>
        <b-table-column field="title" label="Nazwa">
          {{ props.row.title }}
        </b-table-column>
        <b-table-column field="discount" label="Znizka" width="100">
          {{ props.row.discount }}%
        </b-table-column>
        <b-table-column field="link" label="Akcje" width="120">
          <router-link :to="props.row.editLink">Edytuj</router-link> | <a @click.stop="removeDiscountCode(props.row.id)">Usun</a>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      currentPage: 1,
    }
  },
  computed: {
    discounts() {
      let discounts = [...this.$store.state.discounts];
      let discountsData = discounts.sort((a, b) => (a.id > b.id) ? 1 : -1);

      discounts.forEach(discount => {
        discount.editLink = '/dashboard/discounts/' + discount.id;
      });

      return discountsData;
    }
  },
  methods: {
    removeDiscountCode: function(id) {
      this.$buefy.dialog.confirm({
        title: 'Czy jestes pewien?',
        message: 'Usuwasz kod promocyjny, ktorego nie bedzie mozna pozniej odzyskac.',
        confirmText: 'Tak, usun ten kod',
        type: 'is-danger',
        cancelText: 'Anuluj',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('redirecting');
          this.$buefy.toast.open({message: 'Kod promocyjny zostal usuniety!', type: 'is-success'});
          this.$store.commit('removeDiscountCode', id);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .button {
    margin: 15px 0 25px;
  }
</style>