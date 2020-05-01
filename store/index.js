export const strict = false

import  firebase from 'firebase/app';
import emailjs from 'emailjs-com';
import 'firebase/firestore';
import 'firebase/firebase-storage';
import firebaseConfig from '~/assets/data/firebase';
import data from '../assets/data/main';
import { ToastProgrammatic as Toast } from 'buefy';

// Firestore database connection
let db, storage;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Email configuration
let emailserviceid = process.env.EMAIL_SERVICE;
let emailuserid = process.env.EMAIL_USER;

export const state = () => ({
  products: [],
  filteredProducts: [],
  discounts: [],
  reviews: [],
  orders: [],
  assets: [],
  newsletter: [],
  searchKeyword: '',
  categories: data.categories,
  slideshow: data.slideshow.slides,
  filterCategories: [],
  filterPrice: [0, 999],
  filterTags: [],
  sorter: 'popularity-az',
  prices: data.prices,
  messages: [],
  loaded: false,
  redirecting: false,
  ordersLoaded: false
})

export const mutations = {
  setField (state, data) {
    state[data[0]] = state[data[1]];
  },
  setSearchKeyword (state, keyword) {
    state.searchKeyword = keyword;
  },
  setFilterCategory (state, category) {
    state.filterCategories = [category];
  },
  toggleFilterCategory (state, category) {
    state.filterCategories = category;
  },
  filterProducts (state) {
    state.filteredProducts = state.products;

    if (state.filterCategories.length > 0) {
      state.filteredProducts = state.filteredProducts.filter(product => {
        let found = 0;

        state.filterCategories.forEach(category => {
          if (product.category === category) {
            found++;
          };
        });

        if (found > 0) {
            return true;
        }
      });
    } 

    if (state.searchKeyword !== '') {
      state.filteredProducts = state.filteredProducts.filter(product => {
        if (product.title.toLowerCase().indexOf(state.searchKeyword.toLowerCase()) !== -1 || product.tags.toLowerCase().indexOf(state.searchKeyword.toLowerCase()) !== -1) {
          return true;
        }
      });
    }
  },
  sortProducts (state, sorter = null) {
    if (sorter) {
      state.sorter = sorter;
    }

    switch (state.sorter) {
      case 'date-az':
        state.filteredProducts.sort((a, b) => (a.date < b.date) ? 1 : -1);
        break;
      case 'date-za':
        state.filteredProducts.sort((a, b) => (a.date > b.date) ? 1 : -1);
        break;
      case 'popularity-az':
        state.filteredProducts.sort((a, b) => (a.bought < b.bought) ? 1 : -1);
        break;
      case 'popularity-za':
        state.filteredProducts.sort((a, b) => (a.bought > b.bought) ? 1 : -1);
        break;
      case 'price-az':
        state.filteredProducts.sort((a, b) => ((a.price - ((a.price/100) * a.discount)) < (b.price - ((b.price/100) * b.discount))) ? 1 : -1);
        break
      case 'price-za':
        state.filteredProducts.sort((a, b) => ((a.price - ((a.price/100) * a.discount)) > (b.price - ((b.price/100) * b.discount))) ? 1 : -1);
        break
    }
  },
  addMessage (state, message) {
    state.messages.push(message);
  },
  removeMessage (state, index) {
    state.messages.splice(index, 1);
  },
  removeMessages (state) {
    state.messages = [];
  },
  loadAsset (state, data) {
    state.assets.push(data);
  },
  loadData (state, data) {
    let products = data[0].sort((a, b) => (a.title > b.title) ? 1 : -1);

    state.products = products;
    state.filteredProducts = products;
    state.discounts = data[1];
    state.reviews = data[2];
    state.newsletter = data[3];

    state.loaded = true;
  },
  loadOrders (state, orders) {
    state.orders = orders;
    state.ordersLoaded = true;
  },
  addProduct (state, product) {
    db = firebase.firestore();
    const self = this;

    db.collection("products").add(product).then(() => {
      self.app.router.go();
    });
  },
  editProduct (state, data) {
    db = firebase.firestore();
    const self = this;

    db.collection("products").where("id", "==", data[0]).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        db.collection("products").doc(doc.id).update(data[1]).then(() => {
          self.app.router.go();
        });
      });
    });
  },
  removeProduct(state, id) {
    db = firebase.firestore();
    const self = this;

    db.collection("products").where("id", "==", id).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete().then(() => {
          self.app.router.go();
        });
      })
    });
  },
  addNewsletter (state, email) {
    db = firebase.firestore();
    const self = this;

    db.collection("newsletter").add({
      email,
      subscribed: true
    }).then(() => {
      Toast.open({message: 'You have been added to the newsletter list.', type: 'is-success'});
    });
  },
  editNewsletter (state, data) {
    db = firebase.firestore();
    const self = this;
    
    db.collection("newsletter").where("email", "==", data[0]).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        db.collection("newsletter").doc(doc.id).update({subscribed: data[1]}).then(() => {
          self.app.router.go();
        });
      });
    });
  },
  removeNewsletter(state, email) {
    db = firebase.firestore();
    const self = this;

    db.collection("newsletter").where("email", "==", email).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete().then(() => {
          self.app.router.go();
        });
      })
    });
  },
  addDiscountCode (state, discount) {
    db = firebase.firestore();
    const self = this;

    db.collection("discounts").add(discount).then(() => {
      self.app.router.push('/dashboard/discounts');
    });
  },
  editDiscountCode (state, data) {
    db = firebase.firestore();
    const self = this;

    db.collection("discounts").where("id", "==", data[0]).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        db.collection("discounts").doc(doc.id).update(data[1]).then(() => {
          self.app.router.push('/dashboard/discounts');
        });
      });
    });
  },
  removeDiscountCode(state, id) {
    db = firebase.firestore();
    const self = this;

    db.collection("discounts").where("id", "==", id).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete().then(() => {
          self.app.router.go();
        });
      })
    });
  },
  addReview (state, review) {
    db = firebase.firestore();
    db.collection("reviews").add(review);
    state.reviews.push(review);
  },
  dispatchOrder (state, data) {
    db = firebase.firestore();
    const self = this;

    db.collection("orders").where("paypal.orderID", "==", data[0].paypal.orderID).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        db.collection("orders").doc(doc.id).update({status: 'dispatched'});

        // Send email
        let emailParams = {
          "send_to": data[0].details.email,
          "orderID": data[0].paypal.orderID,
          "firstName": data[0].details.firstName,
          "lastName": data[0].details.lastName,
          "address": data[2],
          "cart": data[1],
          "total": data[0].total
        }
        emailjs.send(emailserviceid, 'iconari_dispatched', emailParams, emailuserid);
      });
    });
  },
}

export const actions = {
  redirecting (context) {
    context.state.redirecting = true;
  },
  stopRedirecting (context) {
    context.state.redirecting = false;
  },
  filterProducts (context) {
    context.commit('filterProducts');
  },
  async getShopData (context) {
    db = firebase.firestore();
    storage = firebase.storage();

    let products = [];
    let discounts = [];
    let reviews = [];
    let assets = [];
    let newsletter = [];

    await db.collection('discounts').get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        discounts.push(doc.data());
      });
    });

    await db.collection('newsletter').get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        newsletter.push(doc.data());
      });
    });

    await db.collection('products').get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        products.push(doc.data());
      });
    });

    await db.collection('reviews').get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        reviews.push(doc.data());
      });
    });

    await storage.ref().child('images').listAll().then(function(res) {
      res.items.forEach(imageRef => {
        imageRef.getMetadata().then(function(metadata) {
          imageRef.getDownloadURL().then(url => {
            let imageInfo = [metadata, url];

            context.commit('loadAsset', imageInfo);
          });
        });
      });
    });

    context.commit('loadData', [products, discounts, reviews, newsletter]);
  },
  async getOrdersData (context) {
    db = firebase.firestore();

    let orders = [];

    await db.collection('orders').get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        orders.push(doc.data());
      });
    });
    orders.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);
    context.commit('loadOrders', orders);
  }
}
