<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half-widescreen">
          <h2 class="h2">Contact</h2>

          <p>If you wish to contact us with any questions or requests, please use the form below or send us a letter to this address:

            <address>
              Peter Falencik Photography,<br />
              1280 WILDWOOD LAKES BLVD,<br />
              Naples, FL 34104,<br />
              United States
            </address>
          </p>
          <form name="contact" data-netlify="true" data-netlify-recaptcha="true">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" type="text" name="name" placeholder="Name">
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" name="email" placeholder="Email">
              </div>
            </div>
            
            <div class="field">
              <label class="label">Message</label>
              <div class="control">
                <textarea class="textarea" name="message" placeholder="Message"></textarea>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-success">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Peter Falencik Photography - Contact',
    }
  },
}
</script>

<style lang="scss" scoped>
  p {
    margin: 15px 0;
  }
</style>