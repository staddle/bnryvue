<template>
    <div>
        <!--Projects go here--> 
        <div class="container-fluid container-fix">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="100000"
            controls
            indicators
            background="#ababab"
            img-width="100vw"
            img-height="60vh"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block image-size"
                  src="../assets/imgs/carousel1.jpg"
                >
              </template>
            </b-carousel-slide>
            <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block image-size"
                  src="../assets/imgs/carousel2.png"
                >
              </template>
            </b-carousel-slide>
            <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block image-size"
                  src="../assets/imgs/carousel3.jpg"
                >
              </template>
            </b-carousel-slide>
          </b-carousel>

          <p class="mt-4">
            Slide #: {{ slide }}<br>
            Sliding: {{ sliding }}
          </p>
        </div>
        <div class="testbig"></div>
    </div>
</template>

<script>

export default {
  name: 'Projects',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
}
</script>

<style lang="scss" scoped>
  @import url(../assets/css/projets.css);
</style>