<template>
  <div class="section">
    <h2>Zamowienie #{{id}}</h2>
    <div class="columns" v-if="ordersLoaded">
      <div class="column is-half">
        <h3>Dane Personalne</h3>
        <div><strong>Imie: </strong>{{order.details.title}} {{order.details.firstName}} {{order.details.lastName}}</div>
        <div><strong>Nazwa firmy: </strong>{{order.details.company}}</div>
        <div><strong>Email: </strong>{{order.details.email}}</div>
        <div><strong>Telefon: </strong>{{order.details.phone}}</div>
      </div>

      <div class="column is-half">
        <h3>Dane wysylki</h3>
        <div><strong>Address: </strong>{{order.details.address1}} {{order.details.address2}} {{order.details.address3}}</div>
        <div><strong>City: </strong>{{order.details.city}}</div>
        <div><strong>Zipcode: </strong>{{order.details.zipcode}}</div>
        <div><strong>State: </strong>{{order.details.state}}</div>
      </div>

      <div class="column is-half">
        <h3>Ogolne infromacje</h3>
        <div><strong>Kod PayPal: </strong>{{order.paypal.paymentID}}</div>
        <div><strong>Data zamowienia: </strong>{{order.date}}</div>
        <!-- <div><strong>Cena brutto: </strong>${{order.subtotal}}</div> -->
        <!-- <div><strong>Podatek: </strong>${{order.tax}}</div> -->
        <div><strong>Cena: </strong>${{order.total}}</div>
        <div><strong>Status: </strong><span class="tag" :class="statusType(order.status)" v-html="status(order.status)"></span></div>
        <div class="dispatcher" v-if="order.status !== 'dispatched'">
          <button class="button is-success" @click="dispatch">Oznacz jako wyslane</button>
        </div>
      </div>

      <div class="column is-half" v-if="order.discount">
        <h3>Kupon promocyjny</h3>
        <div><strong>Nazwa: </strong>{{ discount.title }}</div>
        <div><strong>Kupon: </strong>{{ discount.code }}</div>
        <div><strong>Znizka: </strong>{{ discount.discount }}%</div>
      </div>
    </div>

    <div class="columns" v-if="ordersLoaded">
      <div class="column">
        <h3>Dane zamowienia</h3>
        <b-table :data="order.items" :bordered="true" :striped="true" :narrowed="true">
          <template slot-scope="props">
            <b-table-column field="name" label="Nazwa">
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="SKU" label="SKU">
              {{ props.row.sku }}
            </b-table-column>
            <b-table-column field="description" label="Specyfikacja" v-html="extras(props.row.description)">
              0
            </b-table-column>
            <b-table-column field="quantity" label="Ilosc">
              {{ props.row.quantity }}
            </b-table-column>
            <b-table-column field="price" label="Cena">
              ${{ props.row.price }}
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  created() {
    this.$store.dispatch('getOrdersData');
  },
  computed: {
    discounts() {
      return this.$store.state.discounts;
    },
    discount() {
      let discount = this.discounts.filter(discount => discount.id === this.order.discount);
      discount = discount[0];

      return discount;
    },
    ordersLoaded() {
      let ordersLoaded = this.$store.state.ordersLoaded;
      return ordersLoaded;
    },
    id() {
      return this.$route.params.id;
    },
    order() {
      let order = this.$store.state.orders.filter(order => order.paypal.orderID === this.id)[0];
      return order;
    }
  },
  methods: {
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
    },
    extras(extras) {
      let extrasList = '<ul>';
      extras.split(',').forEach(item => {
        extrasList = extrasList + '<li>' + item + '</li>';
      });
      extrasList = extrasList + '</ul>';
      return extrasList;
    },
    dispatch() {
      this.$buefy.dialog.confirm({
        title: 'Czy jestes pewien?',
        message: 'Oznaczasz to zamowienie jako wyslane. Spowoduje to wyslanie emaila to klienta z potwierdzeniem wysylki. Czy jestes pewien ze chcesz kontunuowac',
        confirmText: 'Tak, ten produkt zostal wyslany',
        type: 'is-warning',
        cancelText: 'Anuluj',
        hasIcon: true,
        onConfirm: () => {
          // Send email to customer
          let emailCart = "<table border='1' cellspacing='0' cellpadding='5' style='border: none; border-collapse: collapse;'>";
          emailCart = `${emailCart}<tr><td>Item</td><td>SKU</td><td>Description</td><td>Quantity</td><td>Price</td></tr>`;

          this.order.items.forEach(item => {
            emailCart = `${emailCart}<tr><td>${item.name}</td><td>${item.sku}</td><td>${item.description}</td><td>${item.quantity}</td><td>$${item.price}</td></tr>`;
          });

          // emailCart = `${emailCart}<tr><td style="border: none"></td><td style="border: none"></td><td><strong>Subtotal</strong></td><td><strong>$${this.order.subtotal}</strong></td></tr>`;
          // emailCart = `${emailCart}<tr><td style="border: none"></td><td style="border: none"></td><td><strong>Tax</strong></td><td><strong>$${this.order.tax}</strong></td></tr>`;
          emailCart = `${emailCart}<tr><td style="border: none"></td><td style="border: none"></td><td><strong>Total</strong></td><td><strong>$${this.order.total}</strong></td></tr>`;
          emailCart = emailCart + '</table>';

          let emailShippingAddress = `<p>${this.order.details.address1}`;
          if (this.order.details.address2 != '') emailShippingAddress = emailShippingAddress + ', '  + this.order.details.address2;
          if (this.order.details.address3 != '') emailShippingAddress = emailShippingAddress + ', '  + this.order.details.address3;

          emailShippingAddress = emailShippingAddress + '</p><p>' + this.order.details.city + ', ' + this.order.details.zipcode + '</p><p>' + this.order.details.state + ', United States</p>'

          this.$buefy.toast.open({message: 'Zamowienie zostalo wyslane!', type: 'is-success'});
          this.$store.commit('dispatchOrder', [this.order, emailCart, emailShippingAddress]);
          this.$router.push('/dashboard/orders');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .columns {
    flex-wrap: wrap;

    .column {
      margin-top: 50px;
    }

    .dispatcher {
      margin-top: 25px;
    }
  }
</style>
