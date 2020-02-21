<template>
    <div>
        <!--Projects go here--> 
        <div class="vertical-center">
          <div class="container-fluid">
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333;"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <!-- Text slides with image -->
              <b-carousel-slide
                caption="First slide"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                img-src="../assets/imgs/carousel1.jpg"
              ></b-carousel-slide>

              <!-- Slides with custom text -->
              <b-carousel-slide img-src="../assets/imgs/carousel2.png">
                <h1>Hello world!</h1>
              </b-carousel-slide>

              <!-- Slides with image only -->
              <b-carousel-slide img-src="../assets/imgs/carousel3.jpg"></b-carousel-slide>

              <!-- Slides with img slot -->
              <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
              <b-carousel-slide>
                <template v-slot:img>
                  <img
                    class="d-block img-fluid w-100"
                    width="1024"
                    height="480"
                    src="../assets/imgs/carousel1.jpg"
                    alt="image slot"
                  >
                </template>
              </b-carousel-slide>
            </b-carousel>

            <p class="mt-4">
              Slide #: {{ slide }}<br>
              Sliding: {{ sliding }}
            </p>
          </div>
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