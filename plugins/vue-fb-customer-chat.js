import Vue from 'vue'
import VueFbCustomerChat from 'vue-fb-customer-chat'
 
Vue.use(VueFbCustomerChat, {
  page_id: '259370984191819', //  change 'null' to your Facebook Page ID,
  theme_color: '#d9a13a', // theme color in HEX
  locale: 'en_US', // default 'en_US'
})