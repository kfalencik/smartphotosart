<template>
  <div>
    <Slideshow />
    <div class="sr-only">
      <h2>Change your walls with Peter Falencik Photography</h2>
      <p>Adorning your walls with art is easy when there are thousands of motifs in so many shapes and sizes. It’s even easier when the canvas print is made precisely to your measurements on an environmentally friendly canvas. Your canvas is just a click away. All you need to do is find your favourite motif, choose the size and then decide how you want the edge of the canvas to look.</p>
      <p>You can order your canvas print with or without an inner frame. The DIY inner frame is easy to assemble without tools. Everything you need for your canvas print comes in the package, including the wire for hanging. The print is of the highest quality and will not fade in sunlight. Your print will arrive in a cardboard box that is partially or entirely made from recycled materials.</p>
      <p>We want to help you find the perfect canvas. Our collection contains canvas prints by innovative designers, creative photographers and illustrators who have all created motifs for living rooms, kitchens, bedrooms, children’s rooms and hallways. Together they offer a range of creative expressions suitable for all styles, personalities and settings.</p>
      <p>It’s easy to change the mood of a room with a large canvas. It can also add colour to your white walls. You can experiment with images of flowers, textures or why not even a classic work of art? Our canvas prints come in sizes up to 150 centimeters in height and width and are delivered on a roll in a sturdy cardboard box for easy mounting on our canvas frame.</p>
      <p>It can be hard to choose just one motif for a canvas – sometimes you might rather have two, three, four or even more motifs nested together on one wall. Use a level and measuring stick to hang your canvas prints properly. Consider making a sketch before you begin hanging them. Lay out the prints on the floor if you have the space or else draw them on paper. One extra piece of advice is to have a straight line somewhere, horizontally or vertically, between the prints. This will make the wall look better organised and make it easier to mix and match motifs.</p>
    </div>
    <Services />
    <Popular number="8" />

    <KeyPoints />

    <About />
    
    <LimitedEdition />

    <New number="8" />
    <!-- <Testimonials /> -->

    <div class="sr-only">
      <h4>Search by category</h4>
      <nav>
        <ul>
          <li v-for="category in categories" :key="category.slug">
            <a @click.prevent="setCategory(category.slug)">{{category.title}}</a>
          </li>
        </ul>
      </nav>

      <h4>Search by color</h4>
      <nav>
        <ul>
          <li>
            <a @click.prevent="search('white')">White canvas</a>
          </li>
          <li>
            <a @click.prevent="search('black')">Black canvas</a>
          </li>
          <li>
            <a @click.prevent="search('grey')">Grey canvas</a>
          </li>
          <li>
            <a @click.prevent="search('Purple')">Purple canvas</a>
          </li>
          <li>
            <a @click.prevent="search('Red')">Red canvas</a>
          </li>
          <li>
            <a @click.prevent="search('blue')">Blue canvas</a>
          </li>
          <li>
            <a @click.prevent="search('yellow')">Yellow canvas</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Slideshow from '~/components/Slideshow';
import Popular from '~/components/Popular';
import Testimonials from '~/components/Testimonials';
import New from '~/components/New';
import Services from '~/components/Services';
import KeyPoints from '~/components/KeyPoints';
import LimitedEdition from '~/components/LimitedEditionSection';
import About from '~/components/About';

export default {
  head () {
    return {
      title: 'Peter Falencik Photography - Beautiful canvases for your home or office',
    }
  },
  jsonld() {
    return {
      "@context" : "http://schema.org",
      "@type" : "Organization",
      "name" : "Peter Falencik Photography",
      "url" : "https://www.smartphotosart.com",
      "sameAs" : [
        "https://www.facebook.com/iconarishop",
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1280 WILDWOOD LAKES BLVD",
        "addressRegion": "FL",
        "postalCode": "34104",
        "addressCountry": "US"
      }
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  name: 'HomePage',
  transition: 'page',
  components: {
    Slideshow,
    Popular,
    Testimonials,
    New,
    Services,
    KeyPoints,
    LimitedEdition,
    About
  },
}
</script>
