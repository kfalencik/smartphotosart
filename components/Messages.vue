<template>
  <transition name="slide-up">
    <div id="messages" class="messages" v-if="messages.length > 0">
      <b-message class="message" :duration="message[1] === 'important-bad' ? 60000: 4000" auto-close v-for="(message, index) in messages" :key="'message' + index" :type="message[1] === 'good' ? 'is-success' : 'is-danger'">{{ message[0] }}</b-message>
    </div>
  </transition>
</template>

<script>
  export default {
    computed: {
      messages() {
        return this.$store.state.messages;
      }
    },
    methods: {
      removeMessage(message) {
        this.$store.commit('removeMessage', message);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .messages {
    position: fixed;
    bottom: 20px;
    left: 20px;
    max-width: 100%;
    z-index: 999;

    .message {
      &:first-child {
        margin-top: 35px;
      }
    }
  }
</style>
