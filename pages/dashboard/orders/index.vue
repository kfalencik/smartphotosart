<template>
  <div>
    <h2>Zamowienia</h2>
    <b-table :data="orders" :bordered="true" :striped="true" :narrowed="true" :current-page.sync="currentPage" :paginated="true" :per-page="20">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="230">
          {{ props.row.paypal.orderID }}
        </b-table-column>
        <b-table-column field="firstname" label="Imie">
          {{ props.row.details.firstName }}
        </b-table-column>
        <b-table-column field="lastname" label="Nazwisko">
          {{ props.row.details.lastName }}
        </b-table-column>
        <b-table-column field="email" label="E-mail">
          {{ props.row.details.email }}
        </b-table-column>
        <b-table-column field="date" label="Data zamowienia">
          {{ props.row.date }}
        </b-table-column>
        <b-table-column field="total" label="Cena">
          {{ price(props.row.total) }}
        </b-table-column>
        <b-table-column field="status" label="Status">
          <span class="tag" :class="statusType(props.row.status)" v-html="status(props.row.status)"></span>
        </b-table-column>
        <b-table-column field="link" label="Akcje" width="140">
          <router-link :to="props.row.viewLink">Wiecej informacji</router-link>
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
