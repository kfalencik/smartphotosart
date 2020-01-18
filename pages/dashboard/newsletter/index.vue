<template>
  <div>
    <h2>Newsletter</h2>
    <!-- <router-link class="button is-black" to="/newsletter/send">Wyslij newsletter</router-link> -->
    <b-table :data="newsletter" :bordered="true" :striped="true" :narrowed="true" :current-page.sync="currentPage" :paginated="true" :per-page="20">
      <template slot-scope="props">
        <b-table-column field="email" label="Email">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column field="subscribed" label="Status" width="80">
          <span class="tag is-danger" v-if="!props.row.subscribed">Wylaczone</span> 
          <span class="tag is-success" v-else>Wlaczone</span> 
        </b-table-column>
        <b-table-column field="link" label="Akcje" width="120">
            <span v-if="!props.row.subscribed">
                <a @click.stop="editNewsletter(props.row.email, true)">Wlacz</a> | <a @click.stop="removeNewsletter(props.row.email)">Usun</a>
            </span>
            <span v-else>
                <a @click.stop="editNewsletter(props.row.email, false)">Wylacz</a> | <a @click.stop="removeNewsletter(props.row.email)">Usun</a>
            </span>
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
    newsletter() {
      return this.$store.state.newsletter;
    }
  },
  methods: {
    removeNewsletter: function(email) {
      this.$buefy.dialog.confirm({
        title: 'Czy jestes pewien?',
        message: 'Usuwasz email z listy, ktorego nie bedzie mozna pozniej odzyskac.',
        confirmText: 'Tak, usun ten email',
        type: 'is-danger',
        cancelText: 'Anuluj',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('redirecting');
          this.$buefy.toast.open({message: 'Email zostal usuniety!', type: 'is-success'});
          this.$store.commit('removeNewsletter', email);
        }
      });
    },
    editNewsletter: function(email, status) {
        this.$store.dispatch('redirecting');
        this.$buefy.toast.open({message: 'Zmiany zostaly zapisane!', type: 'is-success'});
        this.$store.commit('editNewsletter', [email, status]);
    }
  }
}
</script>

<style lang="scss" scoped>
  .button {
    margin: 15px 0 25px;
  }
</style>