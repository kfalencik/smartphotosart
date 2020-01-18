import firebase from 'firebase/app';
import emailjs from 'emailjs-com';
import md5 from 'js-md5';
import 'firebase/firestore';
import 'firebase/firebase-storage';
import firebaseConfig from '~/assets/data/firebase';
import { ToastProgrammatic as Toast } from 'buefy'

// Firestore database connection
let db, storage;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Email configuration
let emailserviceid = process.env.EMAIL_SERVICE;
let emailuserid = process.env.EMAIL_USER;

export const state = () => ({
  authorized: false,
  cart: [],
  order: {},
  discount: null,
  expire: 1
});

export const mutations = {
  addToCart (state, data) {
    let cartItem = {
      product: data[0],
      extras: data[1],
      quantity: data[2]
    };

    let found = null;
    let i = 0;

    // Check if item already exists in cart
    state.cart.forEach(item => {
      if (item.product == cartItem.product
        && item.extras[0] == cartItem.extras[0]
        && item.extras[1] == cartItem.extras[1]
        && item.extras[2] == cartItem.extras[2]
        && item.extras[3] == cartItem.extras[3]
      ) {
        found = i;
      }
      i++;
    })

    if (found !== null) {
      state.cart[found].quantity = state.cart[found].quantity + data[2];
    } else {
      state.cart.push(cartItem);
    }
  },
  addDiscount (state, id) {
    state.discount = id;
  },
  login (state) {
    state.authorized = true;
  },
  logout (state) {
    state.authorized = false;
  },
  removeFromCart(state, index) {
    state.cart.splice(index, 1);
  },
  completeOrder (state, data) {
    const self = this;
    db = firebase.firestore();

    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let timeReversed = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

    date = dd + '/' + mm + '/'  + yyyy + ' ' + time;

    state.order.details = data[0];
    state.order.paypal = data[1];
    state.order.items = data[2];
    state.order.total = data[3];

    if (state.discount) {
      state.order.items.pop();
    }

    db.collection("orders").add({
      details: data[0],
      paypal: data[1],
      items: data[2],
      total: data[3],
      status: data[4],
      date: date,
      timestamp: `${yyyy}${mm}${dd}${timeReversed}`,
      discount: state.discount
    });
    state.cart = [];
    state.discount = null;

    let emailCart = "<ul>";
    state.order.items.forEach(item => {
      emailCart = `${emailCart}<li>${item.quantity} x ${item.name} - ${item.description}</li>`;
    });

    emailCart = emailCart + '</ul>';


    let emailShippingAddress = `<p>${state.order.details.address1}`;
    if (state.order.details.address2 != '') emailShippingAddress = emailShippingAddress + ', '  + state.order.details.address2;
    if (state.order.details.address3 != '') emailShippingAddress = emailShippingAddress + ', '  + state.order.details.address3;

    emailShippingAddress = emailShippingAddress + '</p><p>' + state.order.details.city + ', ' + state.order.details.zipcode + '</p><p>' + state.order.details.state + ', United States</p>'

    // Send email
    let emailParams = {
      "send_to": state.order.details.email,
      "orderID": state.order.paypal.orderID,
      "firstName": state.order.details.firstName,
      "lastName": state.order.details.lastName,
      "address": emailShippingAddress,
      "cart": emailCart,
      "total": state.order.total
    }

    emailjs.send(emailserviceid, 'iconari_complete', emailParams, emailuserid).then(function(){
      setTimeout(function(){
        self.app.router.push('/shop/checkout/complete');
      }, 2000);
    });
  }
}

export const actions = {
  authorize (context, data) {
    const self = this;
    db = firebase.firestore();

    db.collection("users").where("password", "==", md5(data[1])).where("email", "==", data[0]).get()
    .then(function(querySnapshot) {
      if(querySnapshot.size) {
        querySnapshot.forEach(doc => {
          const data = doc.data();
          Toast.open({message: 'Witamy ' + data.name + '!', type: 'is-success'});
          context.commit('login');
        })
      } else {
        Toast.open({message: 'Zly email lub haslo. Sprobuj jeszcze raz.', type: 'is-danger'});
      }
    })
  },
}