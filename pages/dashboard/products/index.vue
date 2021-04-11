<template>
  <div>
    <h2>Produkty</h2>
    
    <div class="filters">
      <b-field grouped>
        <p class="control">
        <b-button 
          tag="router-link"
          type="is-dark"
          to="/dashboard/products/add-product"
        >
          Dodaj produkt
        </b-button>
        </p>

        <p class="control">
          <b-autocomplete
            v-model="filterName"
            placeholder="Wyszukaj po nazwie"
            :data="products"
            field="title"
            @input="filterByName"
          >
          </b-autocomplete>
        </p>

        <p class="control">
          <b-select class="control" placeholder="Kategoria" @input="filterByCategory" v-model="filterCategory">
            <option value="">Wybierz kategorie</option>
            <option
              v-for="category in categories"
              :key="category.slug">
              {{ category.title }}
            </option>
          </b-select>
        </p>
      </b-field>
    </div>

    <b-table :data="products" :bordered="true" :striped="true" :narrowed="true" :current-page.sync="currentPage" :paginated="true" :per-page="20">
      <b-table-column field="id" label="ID" width="40" v-slot="props" sortable numeric>
        {{ props.row.slug }}
      </b-table-column>
      <b-table-column field="title" label="Nazwa produktu" v-slot="props" sortable>
        {{ props.row.title }}
      </b-table-column>
      <b-table-column field="price" label="Cena" width="120" v-slot="props" sortable>
        {{ price(props.row.price) }}
      </b-table-column>
      <b-table-column field="discount" label="Znizka" width="100" v-slot="props" sortable>
        <span v-if="props.row.discount > 0">{{ props.row.discount }}%</span>
      </b-table-column>
      <b-table-column field="bought" label="Kolejnosc" width="120" v-slot="props" numeric sortable>
        {{ parseInt(props.row.bought) }}
      </b-table-column>
      <b-table-column field="link" label="Akcje" width="120" v-slot="props">
        <router-link :to="props.row.editLink">Edytuj</router-link> | <a @click.stop="removeProduct(props.row.id)">Usun</a>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      currentPage: 1,
      filterName: '',
      filterCategory: ''
    }
  },
  computed: {
    products() {
      let products = [...this.$store.state.filteredProducts];
      let productsData = products.sort((a, b) => (a.slug > b.slug) ? 1 : -1);

      products.forEach(product => {
        product.editLink = '/dashboard/products/' + product.id;
      });

      return productsData;
    },
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    price: function(price) {
      return '$' + (Math.floor(price * 100) / 100).toFixed(2)
    },

    removeProduct: function(id) {
      this.$buefy.dialog.confirm({
        title: 'Czy jestes pewien?',
        message: 'Usuwasz produkt, ktorego nie bedzie mozna pozniej odzyskac.',
        confirmText: 'Tak, usun ten produkt',
        type: 'is-danger',
        cancelText: 'Anuluj',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('redirecting');
          this.$buefy.toast.open({message: 'Produkt zostal usuniety!', type: 'is-success'});
          this.$store.commit('removeProduct', id);
        }
      });
    },

    filterByCategory () {
      const data = this.$store.state.categories;
      const selectedCategory = data.filter((option) => option.title === this.filterCategory)[0]
      this.$store.commit('setFilterCategory', selectedCategory.slug)
      this.$store.commit('filterProducts')
    },

    filterByName () {
      this.$store.commit('setSearchKeyword', this.filterName)
      this.$store.commit('filterProducts')
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters {
    margin: 15px 0 25px;
  }
</style>