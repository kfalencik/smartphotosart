<template>
  <div>
    <h2>Zamowienia</h2>
    <b-table v-if="orders.length" :data="orders" :bordered="true" :striped="true" :narrowed="true" :current-page.sync="currentPage" :paginated="true" :per-page="20">
        <b-table-column field="id" label="ID" width="230" v-slot="props">
          {{ props.row.paypal.orderID }}
        </b-table-column>
        <b-table-column field="firstname" label="Imie" v-slot="props">
          {{ props.row.details.firstName }}
        </b-table-column>
        <b-table-column field="lastname" label="Nazwisko" v-slot="props">
          {{ props.row.details.lastName }}
        </b-table-column>
        <b-table-column field="email" label="E-mail" v-slot="props">
          {{ props.row.details.email }}
        </b-table-column>
        <b-table-column field="date" label="Data zamowienia" v-slot="props">
          {{ props.row.date }}
        </b-table-column>
        <b-table-column field="total" label="Cena" v-slot="props">
          {{ price(props.row.total) }}
        </b-table-column>
        <b-table-column field="status" label="Status" v-slot="props">
          <span class="tag" :class="statusType(props.row.status)" v-html="status(props.row.status)"></span>
        </b-table-column>
        <b-table-column field="link" label="Akcje" width="140" v-slot="props">
          <router-link :to="props.row.viewLink">Wiecej informacji</router-link>
        </b-table-column>
    </b-table>

    <div v-else>
      Brak zamowien do wyswietlenia.
    </div>
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
  created() {
    this.$store.dispatch('getOrdersData');
  },
  computed: {
    orders() {
      let orders = [...this.$store.state.orders];
      let ordersData = orders.sort((a, b) => (a.id > b.id) ? 1 : -1);

      orders.forEach(product => {
        product.viewLink = '/dashboard/orders/' + product.paypal.orderID;
      });

      console.log(ordersData)

      return ordersData;
    }
  },
  methods: {
    price: function(price) {
      return '$' + (Math.floor(price * 100) / 100).toFixed(2)
    },
    status: function(status) {
      let temp = status;

      switch (temp) {
        case 'abandoned':
          return 'Nie zaplacone'
        case 'paid':
          return '<strong>Zaplacone</strong>'
        case 'dispatched':
          return 'Wyslane'
      }
    },
    statusType: function(status) {
      let temp = status;

      switch (temp) {
        case 'abandoned':
          return 'is-danger'
        case 'paid':
          return 'is-warning'
        case 'dispatched':
          return 'is-success'
      }
    }
  }
}
</script>
